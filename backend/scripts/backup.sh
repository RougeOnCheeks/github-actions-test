#!/usr/bin/env bash
echo "> BE 배포 전 backup"
# 기존 파일 오늘 날짜로 backup 폴더에 복사
sudo cp /usr/local/lib/apache-tomcat-8.5.65/webapps/ROOT.war /usr/local/lib/apache-tomcat-8.5.65/backup/ROOT_$(date "+%Y%m%d%H%M").war
echo "> backup success"