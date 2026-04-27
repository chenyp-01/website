创建nginx，脚本

```
#!/bin/bash
echo "=== Nginx 最终安装脚本 ==="

# 清理环境
pkill nginx 2>/dev/null
systemctl stop nginx 2>/dev/null
rm -f /etc/systemd/system/nginx.service
rm -rf /etc/nginx
rm -rf /var/log/nginx
rm -rf /var/cache/nginx
rm -f /usr/sbin/nginx
rm -rf /usr/local/nginx
systemctl daemon-reload

# 解压安装
cd /root
tar -zxvf nginx-1.24.0.tar.gz
cd nginx-1.24.0

./configure \
--prefix=/usr/local/nginx \
--sbin-path=/usr/sbin/nginx \
--conf-path=/etc/nginx/nginx.conf \
--error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log \
--pid-path=/var/run/nginx.pid

make && make install

# 创建目录
mkdir -p /var/log/nginx /var/cache/nginx /etc/nginx/conf.d

# 使用 root 用户的服务文件
cat > /etc/systemd/system/nginx.service << 'SERVICE_EOF'
[Unit]
Description=The nginx HTTP and reverse proxy server
After=network.target

[Service]
Type=forking
PIDFile=/var/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true
User=root
Group=root

[Install]
WantedBy=multi-user.target
SERVICE_EOF

# 启动
systemctl daemon-reload
nginx -t
systemctl start nginx
systemctl enable nginx

echo "=== 安装完成 ==="
systemctl status nginx --no-pager
echo "访问: http://服务器IP"
```

