#!/bin/bash

npx static --port 3000 example/static &
SERVER_PID=$!

cd example && npm i && cd ../ && DEPLOY_ENV=GH_PAGES npx nuxt generate example

kill $SERVER_PID
