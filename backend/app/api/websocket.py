from fastapi import APIRouter, WebSocket
from pathlib import Path
from ultralytics import YOLO
import cv2
import base64
from PIL import Image
from random import choice
# import asyncio

router = APIRouter(prefix='/ws', tags=['Websocket'])

VIDEO_SOURCE = "/app/data/detection_camera.mp4"
MODEL_DIR = Path('/app/ai_models')
yolo_model = YOLO(MODEL_DIR / "best.pt")

@router.websocket("/vision")
async def vision_stream(websocket: WebSocket):
    await websocket.accept()
    
    cap = cv2.VideoCapture(VIDEO_SOURCE) # or your video path
    
    try:
        while True:
            ret, frame = cap.read()
            if not ret: break

            tables_data = []
            
            # --- Your YOLO Logic ---
            results = yolo_model(frame, conf=0.5)
            for box in results[0].boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                
                label = choice(["Free", "Occupied", "Need Cleaning", "Awaiting"])


                # ... Your Classification Logic ...
                # pil_crop = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))

                # input_tensor = transform(pil_crop).unsqueeze(0).to(device)

                # with torch.no_grad():

                #     outputs = classifier(input_tensor)
                #     _, predicted_class = torch.max(outputs, 1)

                # label = class_names[predicted_class.item()]
                
                # 1. Draw on frame
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                
                # 2. Add to your array
                tables_data.append({
                    "id": str(len(tables_data)),
                    "number": len(tables_data) + 1,
                    "status": label,
                    "box": [x1, y1, x2, y2]
                })

            # Encode frame to Base64
            _, buffer = cv2.imencode('.jpg', frame)
            frame_base64 = base64.b64encode(buffer).decode('utf-8')

            # Send everything in one go
            await websocket.send_json({
                "image": frame_base64,
                "tables": tables_data
            })
            # await asyncio.sleep(0.01) # 10ms sleep to prevent CPU pegging
            
    except Exception as e:
        print(f"Websocket error: {e}")
    finally:
        cap.release()