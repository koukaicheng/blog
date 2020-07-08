#!/usr/bin/env sh
set -e

git status

git add .

git commit -m '更新'

git pull

git push

commit.sh

cd -
