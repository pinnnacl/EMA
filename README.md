 # EMA

## k8 Debugging Method

Create a dummy pod using below command
kubectl run debug-pod --image=curlimages/curl:latest --command -- sleep infinity
kubectl exec -it  mysqldb-0 -- /bin/sh
curl http://<cluster-name>:port/path

check for the curl response

## Challeges

When deploying in kubernetes environment change the DB host name or hostIP in backend application Dockerfile as well as in /backend/db/conn.js

Also the backend URL is configured in frontend route.js which need to be edited

Also there are some unwanted newrelic configuration, find it and remove it.


# Enabling HTTPS with Self-Signed and Let's Encrypt Certificates

This guide explains how to enable HTTPS for your application using either a self-signed certificate (without a domain name) or a Let's Encrypt certificate (with a domain name).

## HTTPS Using a Self-Signed Certificate (Without Domain Name)

### Install Required Packages
```sh
sudo apt update
sudo apt install -y certbot python3-certbot-nginx nginx
```

### Configure Firewall
```sh
sudo ufw allow 'Nginx Full'
```

### Set Up Nginx Configuration
```sh
sudo vi /etc/nginx/sites-available/ema
sudo rm /etc/nginx/sites-enabled/ema
sudo ln -s /etc/nginx/sites-available/ema /etc/nginx/sites-enabled/
```

### Test and Restart Nginx
```sh
sudo nginx -t
sudo systemctl restart nginx
```

### Generate a Self-Signed Certificate
```sh
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx-selfsigned.key -out /etc/nginx/ssl/nginx-selfsigned.crt
```

### Nginx Configuration for Self-Signed Certificate
Create or update your Nginx configuration file (e.g., `/etc/nginx/sites-available/ema`):

```nginx
server {
    listen 80;
    server_name 44.223.103.14;
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name 44.223.103.14;

    ssl_certificate /etc/nginx/ssl/nginx-selfsigned.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx-selfsigned.key;

    location / {
![](https://github.com/git-hub-sachin/EMA/blob/simple-ema/images/Screenshot%20from%202025-02-20%2016-53-29.png)
