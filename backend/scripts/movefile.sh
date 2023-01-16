#!/usr/bin/env bash
echo "> BE deploy"
# 파일 이름 변경 및 tomcat root context 설정한 폴더로 이동 -> autoDeploy
sudo mv /usr/local/lib/apache-tomcat-8.5.65/deploySource/build/libs/map-study-0.0.1-SNAPSHOT.jar /usr/local/lib/apache-tomcat-8.5.65/backup/map-study.jar #test
echo "> deploy start"