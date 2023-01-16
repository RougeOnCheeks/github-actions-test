#!/usr/bin/env bash
echo "> FE 배포 전 backup"
# 기존 파일 오늘 날짜 폴더에 복사
TODAY=$(date "+%Y%m%d%H%M")
sudo mkdir /var/www/backup/${TODAY}
sudo cp -f /var/www/html /var/www/backup/${TODAY}
echo "> backup success"