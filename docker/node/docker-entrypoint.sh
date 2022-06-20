#!/bin/sh

FILE=/client/package.json
if [ ! -f "$FILE" ]; then
    # cp -R /client/* /app
    cd /client
    yarn install
fi

# chmod -R 777  /app

cd /client && yarn install && BROWSER=none yarn start
