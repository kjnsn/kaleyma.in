#!/bin/sh

set -e

gcloud --project=kaley-main-blog functions deploy listPosts --entry-point listPosts --trigger-http --region=asia-northeast1 --runtime=nodejs8
gcloud --project=kaley-main-blog functions deploy getPost --entry-point getPost --trigger-http --region=asia-northeast1 --runtime=nodejs8

