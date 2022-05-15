import cv2 as cv
import numpy as np
from PIL import Image
import torch
import torchvision.transforms as transforms
from facenet_pytorch import MTCNN
import torch.nn.functional as F
import pandas as pd
import tempfile
from .models import build_model

mtcnn = None
device = None
model = None

def init():
    global mtcnn, device, model
    mtcnn = MTCNN()
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = build_model()
    model.load_state_dict(torch.load(r'/app/backend/model_detector/metaformer.pt', map_location=torch.device('cpu')))
    model.eval()

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

def video_to_faces(cap, df, fps):
    count = 0
    dataframe_count = 0

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            break
        img_np = np.array(frame)
        frame = cv.cvtColor(img_np, cv.COLOR_RGB2BGR)

        for result in detect_face_from_image(frame):
            df.loc[dataframe_count] = result
            dataframe_count+=1

        count += fps
        cap.set(cv.CAP_PROP_POS_FRAMES, count)

    cap.release()
    cv.destroyAllWindows()
    return df

def crop_face(img, box, margin=1):
    x1, y1, x2, y2 = box
    size = int(max(x2-x1, y2-y1) * margin)
    center_x, center_y = (x1 + x2)//2, (y1 + y2)//2
    x1, x2 = center_x-size//2, center_x+size//2
    y1, y2 = center_y-size//2, center_y+size//2
    face = Image.fromarray(img).crop([x1, y1, x2, y2])
    return np.asarray(face)

def detect_face_from_image(image):
    global mtcnn
    frames = []

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
            prob = detect(face)
            frames.append([image, box, prob])
    
    return frames

def face_to_tensor(face):
    face_ = cv.resize(face, (224,224), interpolation = cv.INTER_AREA)
    return transform(face_).unsqueeze_(0).to(device)


def detect(face):
    global model
    
    with torch.no_grad():
        face_tensor = face_to_tensor(face)
        tensor = face_tensor.clone().detach()
        output_ = model(tensor)
    return F.softmax(output_, dim=1).tolist()[0][0]


def detect_deepfake(face_tensors):
    global model
    probs = []

    with torch.no_grad():
        for face_tensor in face_tensors:
            tensor = face_tensor.clone().detach()
            output_ = model(tensor)
            prob = F.softmax(output_, dim=1).tolist()
            probs.append(prob[0])

    return probs

def calculate(probs):
    arr = probs.loc[:,'prob']

    arr = arr.values
    
    mean = arr.mean(axis=0)

    return mean

def result_to_video(df, size):
    temp = tempfile.NamedTemporaryFile(suffix='.webm')
    out = cv.VideoWriter(temp.name , cv.VideoWriter_fourcc(*'vp80'), 1, size)

    for i in range(len(df)):
        frame = cv.cvtColor(df.loc[i, "frame"], cv.COLOR_RGB2BGR)
        x1,y1,x2,y2 = df.loc[i, "box"]
        frame = cv.rectangle(frame, (int(x1),int(y1)), (int(x2),int(y2)), (255, 0, 0), 2)
        frame = cv.putText(frame, '{0:.3g}'.format(df.loc[i, "prob"]), (int(x1), int(y1 + 5)), cv.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 1)
        out.write(frame)
    out.release()

    return temp


def detector(directory):
    init()
    df = pd.DataFrame(columns=["frame", "box", "prob"])
    cap, fps, width, height, duration = get_video_props(directory)
    df = video_to_faces(cap, df, fps)
    video = result_to_video(df, (int(width), int(height)))
    probs = calculate(df)
    video.flush()

    video.seek(0)

    results = {'fps': round(fps), 'width': str(int(width)), "height": str(int(height)), 'duration' : round(duration), 'probs': probs, 'prediction': str(probs > 0.5)}

    return results, video