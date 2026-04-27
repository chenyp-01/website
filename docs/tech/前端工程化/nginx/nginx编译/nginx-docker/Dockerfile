FROM alpine:latest AS base

# 历史版本 1.24.0 
ARG NGINX_VERSION=1.28.0 
# 历史版本: 3.0.7 
ARG OPENSSL_VERSION=3.5.0
# 历史版本 1.3.1
ARG ZLIB_VERSION=1.3.1
# 历史版本 8.45
ARG PCRE_VERSION=8.45

# http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz
ADD nginx-${NGINX_VERSION}.tar.gz /

# https://www.openssl.org/source/openssl-${OPENSSL_VERSION}.tar.gz
ADD openssl-${OPENSSL_VERSION}.tar.gz /

# https://zlib.net/zlib-${ZLIB_VERSION}.tar.gz
ADD zlib-${ZLIB_VERSION}.tar.gz /

# https://sourceforge.net/projects/pcre/files/pcre/${PCRE_VERSION}/pcre-${PCRE_VERSION}.tar.gz
ADD pcre-${PCRE_VERSION}.tar.gz /

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
apk update && \
apk add --no-cache --virtual .build-deps gcc g++ make file perl linux-headers && \
cd /nginx-${NGINX_VERSION} && \
./configure --prefix=/app/nginx \
--with-cc-opt='-static -static-libgcc' \
--with-ld-opt='-static' \
--sbin-path=/sbin/nginx \
--pid-path=/run/nginx.pid \
--lock-path=/var/lock/nginx.lock \
--conf-path=/etc/nginx/nginx.conf \
--error-log-path=/dev/stderr \
--http-log-path=/dev/stdout \
--with-compat \
--with-threads \
--with-file-aio \
--with-openssl=/openssl-${OPENSSL_VERSION} \
--with-zlib=/zlib-${ZLIB_VERSION} \
--with-pcre=/pcre-${PCRE_VERSION} \
--with-pcre \
--with-pcre-jit \
--with-http_ssl_module \
--with-http_v2_module \
--with-http_gunzip_module \
--with-http_gzip_static_module \
--with-http_slice_module \
--with-http_stub_status_module \
--with-http_realip_module \
--with-http_auth_request_module \
--with-http_addition_module \
--with-http_sub_module \
--with-http_dav_module \
--with-stream  && \
make && make install

FROM alpine

COPY --from=base /app/nginx /app/nginx
COPY --from=base /sbin/nginx /sbin/nginx
COPY --from=base /etc/nginx /etc/nginx

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
