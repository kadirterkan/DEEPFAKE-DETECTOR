FROM python:3
RUN apt-get update
RUN apt-get upgrade -y
RUN apt --fix-broken install
RUN apt-get install -y ffmpeg libsm6 libxext6

WORKDIR /app/backend
COPY . /app/backend
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]