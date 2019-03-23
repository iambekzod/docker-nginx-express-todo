FROM nginx

RUN apt-get update && apt-get install -y vim

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80