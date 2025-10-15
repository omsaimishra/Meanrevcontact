#!/bin/bash
set -e

echo " Starting Docker Compose deployment..."

cd /home/ubuntu/contact

# Login to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 143262365667.dkr.ecr.ap-south-1.amazonaws.com

# Stop and remove old containers
docker compose down || true

# Pull the latest images
docker compose pull

# Start new containers
docker compose up -d

echo " Deployment completed successfully!"
