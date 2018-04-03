#!/bin/sh

set -e

gcloud beta functions deploy listPosts --entry-point listPosts --trigger-http
gcloud beta functions deploy getPost --entry-point getPost --trigger-http

