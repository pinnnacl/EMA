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
        proxy_pass http://44.223.103.14:5000; # Adjust if needed
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Restart Nginx:
```sh
sudo nginx -t
sudo systemctl restart nginx
```

---

## HTTPS Using Let's Encrypt (With Domain Name)

### Install Required Packages
```sh
sudo apt update
sudo apt install -y certbot python3-certbot-nginx nginx
```

### Configure Firewall
```sh
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

### Obtain SSL Certificate
```sh
sudo certbot --nginx -d abc2.solutions
```

### Update Nginx Configuration
Edit the Nginx configuration file (`/etc/nginx/sites-available/default` or your custom config):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000; # Adjust port if needed
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Alternatively, if you do not need HTTPS redirection:
```nginx
server {
    listen 80;
    server_name abc2.solutions www.abc2.solutions;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Restart Nginx and Verify Installation
```sh
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d abc2.solutions
```

### Verify Certificate Installation
```sh
sudo ls -l /etc/letsencrypt/live/abc2.solutions/
sudo certbot certificates
sudo certbot renew --dry-run
```

### Verify DNS Resolution
```sh
dig abc2.solutions +short
```

![](https://github.com/git-hub-sachin/EMA/blob/simple-ema/images/Screenshot%20from%202025-02-20%2016-53-29.png)
