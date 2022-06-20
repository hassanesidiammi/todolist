ARG IMAGE_NODE_LBEL

FROM node:${IMAGE_NODE_LBEL}

LABEL org.opencontainers.image.authors="h.sidiammi@gmail.com"

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

