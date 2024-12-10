#!/bin/bash

sudo rsync -avh /home/deployer/ema/nginx/ /etc/nginx/
cd /etc/nginx/sites-enabled
sudo rm *
sudo ln -sf ../sites-available/* .
sudo systemctl restart nginx.service