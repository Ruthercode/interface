FROM python:latest
MAINTAINER Pavel Mironchenko 'ruthercode@gmail.com'
RUN apt-get update -y
RUN apt-get install -y libpq-dev
COPY . /app
WORKDIR /app 
RUN pip install -r requirements.txt