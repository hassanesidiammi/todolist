#!/bin/sh

FILE=/app/package.json
if [ ! -f "$FILE" ]; then
    cp -R /client/* /app
    cd /app
    yarn install
fi

chmod -R 777  /app
cd /app

BROWSER=none yarn start
