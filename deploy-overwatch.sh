#!/bin/bash

cd  overwatch/ && echo 'Inside Overwatch Directory'

git reset --hard HEAD && git pull origin main && echo 'pulled master main'

cp /home/opc/overwatch-content/.env /home/opc/overwatch-content/overwatch/ && echo 'copied env'

docker-compose up -d --build --force-recreate && echo 'Container up and Running'