#!/bin/bash

cd  overwatch/ && echo 'Inside Overwatch Directory'

git reset --hard HEAD && git pull origin main && echo 'pulled master main'

docker compose up -d --build --remove-orphans && echo 'Container up and Running'