#!/bin/sh

set -e

build_dir=$1

HEROKU_APP=$(echo $HEROKU_APP)
HEROKU_API_KEY=$(echo $HEROKU_API_KEY)

if [ -z "$HEROKU_API_KEY" ]; then
    echo "No HEROKU_API_KEY set"
    exit 1
fi 
if [ -z "$HEROKU_APP" ]; then
    echo "No HEROKU_APP set"
    exit 1
fi 

curl_heroku_body() {
    local method=$1
    local url="https://api.heroku.com$2"
    curl -s -L -X $method $url -H "Authorization: Bearer $HEROKU_API_KEY" -H 'Accept: application/vnd.heroku+json; version=3' -H "Content-Type: application/json" -d "$3"
}

archive_file="slug.tgz"

echo "=====> Creating application release from slug"
blob_urls=$(curl_heroku_body "POST" "/apps/$HEROKU_APP/slugs" '{"process_types":{"web":"nodejs/bin/node server.js"}}')
put_url=$(echo "$blob_urls" | grep url | cut -d '"' -f4)
release_slug_token=$(echo "$blob_urls" | grep -m2 id | cut -d '"' -f4 | xargs)

echo "=====> Creating  application archive ($archive_file)"
tar czf $archive_file ./$build_dir

echo "=====> Uploading application archive"
curl $put_url -X PUT -H 'Content-Type:' --data-binary @$archive_file

echo "=====> Creating application release ($release_slug_token)"
build_body='{"slug":"'$release_slug_token'"}'
curl_heroku_body "POST" "/apps/$HEROKU_APP/releases" $build_body

echo "=====> Released"

exit 0
