#!/bin/bash
set -e
cd /home/ubuntu/contact
aws ecr get-login-password --region ap-south-1 \
  | docker login --username AWS --password-stdin 143262365667.dkr.ecr.ap-south-1.amazonaws.com
IMAGE_TAG=$(grep -oP '(?<="imageUri":")[^"]*' imagedefinitions.json | awk -F: '{print $2}')
export IMAGE_TAG=${IMAGE_TAG:-latest}
echo "Using IMAGE_TAG=$IMAGE_TAG"
sudo --preserve-env=IMAGE_TAG docker compose down || true
sudo --preserve-env=IMAGE_TAG docker compose pull
sudo --preserve-env=IMAGE_TAG docker compose up -d

