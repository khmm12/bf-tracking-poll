#!/bin/sh

cd $(dirname "$0")

IMAGE_NAME=bf-tracking-poll
branch=master
revision=$(git rev-parse --short master)
name_image_tag=$IMAGE_NAME:$revision

echo ------------------------------------------------------------
echo branch is $branch
echo revision is $revision
echo ------------------------------------------------------------


rm -rf ./docker/bf-tracking-poll
mkdir ./docker/bf-tracking-poll
cd .. && git archive $branch --format=tar | tar xvf - -C ./build/docker/bf-tracking-poll > /dev/null
cd build

docker build --rm --tag="$name_image_tag" ./docker
echo ------------------------------------------------------------
echo SUCCESS - $name_image_tag

rm -rf ./docker/bf-tracking-poll
