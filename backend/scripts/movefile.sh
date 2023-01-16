#!/usr/bin/env bash
echo "> BE deploy"
# 파일 이름 변경 및 tomcat root context 설정한 폴더로 이동 -> autoDeploy
sudo mv build/lib/map-study-0.0.1-SNAPSHOT.jar ../backup/map-study.jar #test
echo "> deploy start"