FROM nginx

RUN apt-get update && apt-get install -y vim

COPY ./todo/server.crt /etc/nginx/ssl/localhost.crt
COPY ./todo/server.key /etc/nginx/ssl/localhost.key

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80