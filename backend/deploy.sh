#!/usr/bin/env bash
echo "> BE 배포"
today=$(date "+%Y%m%d%H%M")
sudo cp /usr/local/lib/apache-tomcat-8.5.65/webapps/ROOT.war /usr/local/lib/apache-tomcat-8.5.65/backup/ROOT_${today}.war
echo "> backup success"