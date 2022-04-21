FROM python:3
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
WORKDIR /app/backend
COPY requirements.txt /app/backend
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]