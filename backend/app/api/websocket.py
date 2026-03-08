from fastapi import APIRouter, WebSocket
from pathlib import Path
from ultralytics import YOLO
import cv2
import base64
from PIL import Image
from random import choice
import torch
from app.utils.resnet import prepare_resnet
import time
import asyncio

router = APIRouter(prefix='/ws', tags=['Websocket'])

VIDEO_DIR = "/app/data/test_videos/"
MODEL_DIR = Path('/app/ai_models')
yolo_model = YOLO(MODEL_DIR / "best.pt")
class_names = torch.load(MODEL_DIR / "class_names.pth")
state_dict = torch.load(MODEL_DIR / "fluxia_classifier.pth", map_location=torch.device('cpu'))
MARGIN = 0.3


IMG_SIZE = 224
NORMALIZE_MEAN = [0.485, 0.456, 0.406]
NORMALIZE_STD = [0.229, 0.224, 0.225]
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

classifier, transform = prepare_resnet(DEVICE, state_dict, IMG_SIZE, NORMALIZE_MEAN, NORMALIZE_STD)



@router.websocket("/vision")
async def vision_stream(websocket: WebSocket):
    await websocket.accept()

    VIDEO_SOURCE = choice(list(Path(VIDEO_DIR).glob("*")))
    
    cap = cv2.VideoCapture(VIDEO_SOURCE)

    boxes = None
    
    occupancy_timers = {}

    colors = {
        "occupied": (225, 113, 0),
        "need cleaning": (21, 93, 252),
        "free": (0,  153, 102),
        "awaiting": (127, 34, 254),
    }

    try:
        while True:
            ret, frame = cap.read()
            if not ret: break

            tables_data = []

            h, w = frame.shape[:2]
            
            ### YOLO Detection
            # results = yolo_model(frame, conf=0.5)

            # if len(results[0].boxes) > 0:
            #     boxes = results[0].boxes

            if boxes is not None:

                for ind, box in enumerate(boxes):
                    x1, y1, x2, y2 = map(int, box.xyxy[0])

                    # Crop Image
                    crop = frame[y1:y2, x1:x2]

                    # Add Margin Safely
                    box_w = x2 - x1
                    box_h = y2 - y1

                    x_pad = int(box_w * MARGIN)
                    y_pad = int(box_h * MARGIN)

                    x1_new = max(0, x1 - x_pad)
                    y1_new = max(0, y1 - y_pad)
                    x2_new = min(w, x2 + x_pad)
                    y2_new = min(h, y2 + y_pad)

                    crop = frame[y1_new:y2_new, x1_new:x2_new]

                    if crop.size == 0:
                        continue


                    # Classify Table
                    pil_crop = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))
                    input_tensor = transform(pil_crop).unsqueeze(0).to(DEVICE)

                    with torch.no_grad():
                        outputs = classifier(input_tensor)
                        _, predicted_class = torch.max(outputs, 1)

                    label: str = class_names[predicted_class.item()].replace("_", " ")

                    table_id = ind + 1

                    # Table occupancy timer
                    duration = 0
                    if label == "occupied":
                        # If it wasn't occupied before, start the timer
                        if table_id not in occupancy_timers:
                            occupancy_timers[table_id] = time.time()
                        
                        # Calculate how long it has been occupied
                        duration = int(time.time() - occupancy_timers[table_id])
                    else:
                        # If the table is free or awaiting, reset the timer
                        occupancy_timers.pop(table_id, None)
                    

                    # Draw on frame
                    cv2.rectangle(frame, (x1, y1), (x2, y2), colors[label], 2)

                    cv2.putText(
                        frame,
                        str(ind + 1) + ".",
                        (x1, y1 - 3),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,
                        (127, 34, 254),
                        2
                    )
                    

                    tables_data.append({
                        "id": str(len(tables_data)),
                        "number": len(tables_data) + 1,
                        "status": label,
                        "occupationTime": duration,
                        "box": [x1, y1, x2, y2]
                    })

            else:

                # YOLO Detection
                results = yolo_model(frame, conf=0.5)

                if len(results[0].boxes) > 0:
                    boxes = results[0].boxes


            # Encode frame to Base64
            _, buffer = cv2.imencode('.jpg', frame)
            frame_base64 = base64.b64encode(buffer).decode('utf-8')

            # Send everything in one go
            await websocket.send_json({
                "image": frame_base64,
                "tables": tables_data
            })
            await asyncio.sleep(0.1) # 10ms sleep to prevent CPU pegging
            
    except Exception as e:
        print(f"Websocket error: {e}")
    finally:
        cap.release()