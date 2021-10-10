#!/bin/bash

ncc build index.js
git add .
git commit -m "build"
git tag -a "v$1" -m "build"
# git push --follow-tags
