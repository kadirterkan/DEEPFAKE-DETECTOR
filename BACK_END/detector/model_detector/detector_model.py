from .coatnet import coatnet_0
import cv2 as cv
import numpy as np
from PIL import Image
import torch
import torchvision.transforms as transforms
from facenet_pytorch import MTCNN
import torch.nn.functional as F

mtcnn = MTCNN()
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model = coatnet_0().to(device)
model.load_state_dict(torch.load(r'/app/backend/model_detector/coatnet.pt', map_location=torch.device('cpu')))
transform = transforms.Compose(
    [transforms.ToTensor(),
     transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])

def get_video_props(directory):
    cap = cv.VideoCapture(directory)
    fps = cap.get(cv.CAP_PROP_FPS)
    frame_count = int(cap.get(cv.CAP_PROP_FRAME_COUNT))

    width = cap.get(cv.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv.CAP_PROP_FRAME_HEIGHT)

    duration = frame_count / fps

    return cap, fps, width, height, duration

def video_to_faces(cap, fps):
    faces = []
    count = 0

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            break
        img_np = np.array(frame)
        frame = cv.cvtColor(img_np, cv.COLOR_RGB2BGR)
        faces.append(face_detect(frame))
        count += fps
        cap.set(cv.CAP_PROP_POS_FRAMES, count)

    cap.release()
    cv.destroyAllWindows()
    return faces

def crop_face(img, box, margin=1):
    x1, y1, x2, y2 = box
    size = int(max(x2-x1, y2-y1) * margin)
    center_x, center_y = (x1 + x2)//2, (y1 + y2)//2
    x1, x2 = center_x-size//2, center_x+size//2
    y1, y2 = center_y-size//2, center_y+size//2
    face = Image.fromarray(img).crop([x1, y1, x2, y2])
    return np.asarray(face)

def face_detect(image):
    faces = []

    results = mtcnn.detect(image)

    if results is None:
        return

    boxes, probs = results
    
    if boxes is None or probs is None:
        return

    for j, box in enumerate(boxes):
        if probs[j] > 0.98:
            face = crop_face(image, box)
            face = cv.cvtColor(face, cv.COLOR_RGB2BGR)
            faces.append(face)

    return faces

def faces_to_tensor(faces):
    face_tensors = []

    for face in faces:
        face = Image.fromarray(face[0])
        face_ = face.resize((224,224))
        image_tensor = transform(face_).unsqueeze_(0).to(device)
        face_tensors.append(image_tensor)

    return face_tensors

def detect_deepfake(face_tensors):
    probs = []

    for face_tensor in face_tensors:
        tensor = face_tensor.clone().detach()
        output_ = model(tensor)
        prob = F.softmax(output_, dim=1).tolist()
        probs.append(prob[0])

    return probs

def calculate(probs):
    arr = np.asarray(probs)

    mean = arr.mean(axis=0)

    return mean

def detector(directory):
    print(directory)
    cap, fps, width, height, duration = get_video_props(directory)
    faces = video_to_faces(cap, fps)
    face_tensors = faces_to_tensor(faces)
    probs = detect_deepfake(face_tensors)
    mean = calculate(probs)

    results = {"data" : [mean[0]*100,mean[1]*100], "fps": round(fps), "res": str(int(width)) + "x" + str(int(height)), "duration" : round(duration)}
    return results