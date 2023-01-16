#!/usr/bin/env bash
echo "> FE deploy"
# 파일 이름 변경 및 root 폴더로 이동 -> autoDeploy
sudo mv /var/www/config/dist/static /var/www/backup/static_test
sudo mv /var/www/config/dist/index.html /var/www/backup/index_test.html
echo "> deploy start"
