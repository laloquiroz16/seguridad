## BUILD
FROM node:10-alpine as builder
RUN apk add --no-cache git
RUN apk add python make g++

COPY package.json package-lock.json ./

RUN  mkdir /ng-app
WORKDIR /ng-app
COPY . .

RUN apk --no-cache add jq
RUN apk --no-cache add curl

ARG APP_VERSION
ENV APP_VERSION ${APP_VERSION}
ARG DOPPLER_PROJECT
ENV DOPPLER_PROJECT ${DOPPLER_PROJECT}
ARG DOPPLER_CONFIG
ENV DOPPLER_CONFIG ${DOPPLER_CONFIG}
ARG DOPPLER_TOKEN
ENV DOPPLER_TOKEN ${DOPPLER_TOKEN}
ARG APP_REVISION
ENV APP_REVISION ${APP_REVISION}
RUN curl --request GET \
    --url "https://api.doppler.com/v3/configs/config/secrets?project=${DOPPLER_PROJECT}&config=${DOPPLER_CONFIG}&include_dynamic_secrets=true&dynamic_secrets_ttl_sec=31536000" \
    --header 'Accept: application/json' \
    --header "Authorization: Basic ${DOPPLER_TOKEN}" \
    --header 'accepts: application/json' >>response.txt
RUN jq -r '.secrets | keys[] as $k | "\($k)=\(.[$k] | .computed)"' <response.txt >>.env
RUN rm response.txt

RUN npm install && \
    npm run build:production

## SETUP
FROM nginx:1.16.0
# Dependency fix for Debian Stretch
RUN for i in $(seq 1 8); do mkdir -p "/usr/share/man/man${i}"; done

RUN echo "deb http://archive.debian.org/debian stretch stretch-security main contrib non-free" > /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y curl build-essential \
    libcurl4-openssl-dev libxml2-dev libsqlite3-dev libpq-dev jq \
    nodejs postgresql-client sqlite3 --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN apt-get update && apt-get install -y nginx-extras

RUN rm -rf /usr/share/nginx/html/*
COPY .nginx.conf /etc/nginx/nginx.conf
COPY .nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /ng-app/dist /usr/share/nginx/html
COPY --from=builder /ng-app/.well-known /var/www/static
CMD ["nginx", "-g", "daemon off;"]