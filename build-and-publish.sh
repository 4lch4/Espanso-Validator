#!/bin/bash

yarn package && yarn build

echo 'code packaged and built, ready to commit'

git add .
git commit -m 'build: pushing latest code'
git tag -a 'v$1' -m 'release $1'
git push --follow-tags

# ncc build index.js
# git add .
# git commit -m "build"
# git tag -a "v$1" -m "build"
# git push --follow-tags
