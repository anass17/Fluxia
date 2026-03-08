from torchvision import transforms, models
import torch.nn as nn

def prepare_resnet(device, state_dict, img_size, norm_mean, norm_std):

    classifier = models.resnet18(weights=None)

    num_features = classifier.fc.in_features
    classifier.fc = nn.Linear(num_features, 4)

    classifier.load_state_dict(state_dict)
    classifier.to(device)
    classifier.eval()


    transform = transforms.Compose([
        transforms.Resize((img_size, img_size)),
        # transforms.RandomHorizontalFlip(),
        # transforms.RandomRotation(10),
        transforms.ToTensor(),
        transforms.Normalize(
            norm_mean,
            norm_std
        )
    ])

    return classifier, transform