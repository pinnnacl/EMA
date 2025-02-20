FROM nginx:latest
WORKDIR /app
COPY package*.json /app/

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /etc/ssl/ema /etc/ssl/ema


RUN npm install
COPY . /app
CMD ["node", "app.js"]
EXPOSE 80 443
