#!/bin/bash
function makeVersion (){
  # Use last commit message as version, clean it up first
  git log --oneline -n 1 \
  | tr -sC '[:alnum:]' '-' \
  | tr 'A-Z' 'a-z' \
  | sed -E 's/-+$//' \
  | head -c 60
}
appcfg.py update ./server/app.yaml --version=v-"`makeVersion`"
