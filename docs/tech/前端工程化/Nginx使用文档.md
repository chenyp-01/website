## 一、宿主机通过 yum 安装 Nginx

**yum（Yellowdog Updater Modified）** 是 **RedHat / CentOS / Rocky / AlmaLinux 等 RPM 系统自带的包管理工具**

作用：安装、更新、卸载软件包

**一般系统自带**，不需要手动安装

~~~markdown
# Nginx 安装与 Docker 运行笔记

## 一、宿主机通过 yum 安装 Nginx

### 1. 安装步骤

```bash
# 更新系统仓库
sudo yum update -y

# 安装 EPEL 仓库（部分系统需要）
sudo yum install epel-release -y

# 安装 nginx
sudo yum install nginx -y

# 启动 nginx 服务
sudo systemctl start nginx

# 设置开机自启
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
~~~

### 2. 常用命令

| 命令                                | 作用                       |
| ----------------------------------- | -------------------------- |
| `nginx -t`                          | 测试配置是否正确           |
| `nginx -s reload`                   | 重新加载配置（不重启进程） |
| `systemctl restart nginx`           | 重启 nginx                 |
| `tail -f /var/log/nginx/access.log` | 查看访问日志               |
| `tail -f /var/log/nginx/error.log`  | 查看错误日志               |

### 3. 配置文件路径

| 文件                       | 说明                   |
| -------------------------- | ---------------------- |
| `/etc/nginx/nginx.conf`    | 主配置文件             |
| `/etc/nginx/conf.d/*.conf` | 子配置文件，放站点配置 |
| `/usr/share/nginx/html`    | 默认网站根目录         |
| `/var/log/nginx`           | 日志目录               |

------

## 二、使用 Docker 运行 Nginx

### 1. 拉取官方 Nginx 镜像

```bash
docker pull nginx:latest
```

### 2. 运行 Nginx 容器（基础方式）

```bash
docker run -d \
  --name my-nginx \
  -p 8080:80 \
  nginx:latest
```

- `-d` → 后台运行
- `--name` → 容器名称
- `-p 8080:80` → 宿主机端口映射到容器 80

访问 `http://服务器IP:8080` 查看效果。

### 3. 挂载静态文件目录

假设前端打包后的静态文件在 `/home/user/my-site`：

```bash
docker run -d \
  --name my-nginx \
  -p 8080:80 \
  -v /home/user/my-site:/usr/share/nginx/html:ro \
  nginx:latest
```

- `/home/user/my-site` → 宿主机打包好的静态文件
- `/usr/share/nginx/html` → 容器内部 Nginx 默认网站根目录
- `:ro` → 容器只读，不会修改宿主机文件

### 4. 挂载自定义配置文件

```bash
docker run -d \
  --name my-nginx \
  -p 8080:80 \
  -v /home/user/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v /home/user/my-site:/usr/share/nginx/html:ro \
  nginx:latest
```

- 使用宿主机自定义配置覆盖容器默认配置
- 结合静态文件目录即可直接启动完整网站服务

### 5. 常用 Docker 管理命令

| 命令                                 | 作用             |
| ------------------------------------ | ---------------- |
| `docker ps`                          | 查看运行中的容器 |
| `docker logs my-nginx`               | 查看容器日志     |
| `docker exec -it my-nginx /bin/bash` | 进入容器         |
| `docker stop my-nginx`               | 停止容器         |
| `docker start my-nginx`              | 启动已停止容器   |
| `docker rm my-nginx`                 | 删除容器         |

### 6. nginx的反向代理配置

```
1.如果是那个前端内网到---后端内网，只需要直连就行了
2.如果是前端外网到---后端外网，需要走代理
代理的话看是不是路由器统一转发的，如果是统一转发的，需要加上前缀，再去掉前缀，然后实现前端外网地址代理前端内网地址，后端外网地址代理后端内网，然后去掉前缀，使用路由器统一转发的ip地址端口访ip地址端口
```

### 7.网络连通性检查

```
# 检查网络连通性
ping 192.168.0.136

# 检查端口是否开放
telnet 192.168.0.136 3000

# 或者使用curl测试
curl http://192.168.0.136:3000
```

### 8.如何把服务器文件下载本地

````
你可以通过以下几种方式将服务器上的文件下载到本地：

## 1. 使用 SCP 命令（推荐）

```bash
# 从本地终端执行（不是在服务器上执行）
scp root@你的服务器IP:/root/docker/文件名 本地保存路径

# 示例：
scp root@123.45.67.89:/root/docker/dist.zip ~/Downloads/
scp root@123.45.67.89:/root/docker/docker-20.10.6.tgz ./Desktop/
```

## 2. 使用 SFTP

```bash
# 连接到服务器
sftp root@你的服务器IP

# 进入文件所在目录
cd /root/docker

# 下载文件
get dist.zip
get docker-20.10.6.tgz

# 或者下载整个目录
get -r nginx

# 退出
exit
```

## 3. 使用 rz/sz 命令（如果已安装）

在服务器上执行：
```bash
# 进入文件目录
cd /root/docker

# 下载单个文件
sz dist.zip

# 下载多个文件
sz dist.zip docker-20.10.6.tgz
```

## 4. 使用 FTP 客户端

使用 FileZilla、WinSCP 等工具：
- 主机：你的服务器IP
- 用户名：root
- 密码：你的服务器密码
- 端口：22 (SFTP) 或 21 (FTP)

## 5. 使用 wget/curl（如果文件可通过web访问）

如果文件可以通过web访问，可以在本地使用：
```bash
wget http://你的服务器IP/文件路径
```

## 注意事项：

1. **替换IP地址**：将命令中的"你的服务器IP"替换为实际服务器IP
2. **文件路径**：确保使用正确的文件路径
3. **权限**：确保有下载文件的权限
4. **网络**：确保本地与服务器网络连通

推荐使用 **SCP** 方法，它简单直接且安全。
````

安装包安装

```
# 下载二进制版本
# nginx.org/download/nginx-1.24.0.tar.gz
```

一键安装脚本

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

把自己的dist文件夹放到服务器上，然后修改Nginx代理的位置

```
cat > /etc/nginx/nginx.conf << 'EOF'
user root;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    access_log /var/log/nginx/access.log;
    sendfile on;
    keepalive_timeout 65;
    
    server {
        listen 80;
        server_name _;
        
        # 设置网站根目录
        root /root/dist;
        index index.html index.htm;
        
        # 主要配置
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
EOF
```

清理Nginx的脚本

```
#!/bin/bash
echo "=== 彻底清除 Nginx ==="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# 检查 root 权限
if [ $(id -u) -ne 0 ]; then
    error "请使用 root 用户运行此脚本"
    exit 1
fi

echo "此脚本将彻底删除 Nginx，包括："
echo "✅ 停止所有 Nginx 进程"
echo "✅ 删除系统服务"
echo "✅ 删除二进制文件"
echo "✅ 删除配置文件"
echo "✅ 删除日志文件"
echo "✅ 删除用户数据"
echo ""
read -p "确定要继续吗？(y/N): " confirm

if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "操作已取消"
    exit 0
fi

log "开始彻底清除 Nginx..."

# 1. 停止所有 Nginx 相关进程
log "停止 Nginx 进程..."
systemctl stop nginx 2>/dev/null
pkill -9 nginx 2>/dev/null
sleep 2

# 停止并禁用服务
systemctl disable nginx 2>/dev/null

# 2. 删除系统服务文件
log "删除系统服务..."
rm -f /etc/systemd/system/nginx.service
rm -f /usr/lib/systemd/system/nginx.service
rm -f /etc/init.d/nginx
systemctl daemon-reload
systemctl reset-failed nginx 2>/dev/null

# 3. 删除二进制文件
log "删除二进制文件..."
rm -f /usr/sbin/nginx
rm -f /usr/local/sbin/nginx
rm -f /usr/bin/nginx

# 查找并删除其他可能的 nginx 二进制文件
find /usr/local/bin /usr/bin /opt -name "nginx" -type f -delete 2>/dev/null

# 4. 删除安装目录
log "删除安装目录..."
rm -rf /usr/local/nginx
rm -rf /opt/nginx
rm -rf /etc/nginx

# 5. 删除数据和日志
log "删除数据和日志..."
rm -rf /var/log/nginx
rm -rf /var/cache/nginx
rm -rf /var/lib/nginx
rm -rf /usr/share/nginx
rm -rf /var/www/html

# 6. 删除运行文件
log "删除运行文件..."
rm -f /var/run/nginx.pid
rm -f /var/run/nginx.lock
rm -rf /var/run/nginx
rm -f /run/nginx.pid

# 7. 删除源码目录
log "删除源码目录..."
rm -rf /root/nginx-*
rm -rf /tmp/nginx-*

# 8. 删除配置文件备份
log "删除配置文件备份..."
find /etc -name "nginx.conf.*" -delete 2>/dev/null
find /root -name "nginx.conf.*" -delete 2>/dev/null

# 9. 删除用户和组（可选）
read -p "是否删除 nginx 用户和组？(y/N): " delete_user
if [[ $delete_user =~ ^[Yy]$ ]]; then
    log "删除 nginx 用户和组..."
    userdel nginx 2>/dev/null
    groupdel nginx 2>/dev/null
else
    warn "保留 nginx 用户和组"
fi

# 10. 清理包管理器安装的 Nginx
log "清理包管理器安装的 Nginx..."

# CentOS/RHEL
if command -v rpm >/dev/null 2>&1; then
    rpm -qa | grep nginx | while read package; do
        warn "发现 RPM 包: $package"
        rpm -e --nodeps $package 2>/dev/null && log "已删除: $package" || error "删除失败: $package"
    done
fi

# Ubuntu/Debian
if command -v dpkg >/dev/null 2>&1; then
    dpkg -l | grep nginx | awk '{print $2}' | while read package; do
        warn "发现 DEB 包: $package"
        dpkg -P $package 2>/dev/null && log "已删除: $package" || error "删除失败: $package"
    done
fi

# 11. 最终验证
log "=== 清理完成验证 ==="

echo -n "Nginx 进程: "
if pgrep nginx >/dev/null; then
    error "仍有 Nginx 进程运行"
else
    echo -e "${GREEN}无进程${NC}"
fi

echo -n "Nginx 命令: "
if which nginx >/dev/null 2>&1 || command -v nginx >/dev/null 2>&1; then
    error "Nginx 命令仍存在"
else
    echo -e "${GREEN}已删除${NC}"
fi

echo -n "配置文件: "
if [ -d "/etc/nginx" ] || [ -f "/etc/nginx/nginx.conf" ]; then
    error "配置文件仍存在"
else
    echo -e "${GREEN}已删除${NC}"
fi

echo -n "服务文件: "
if [ -f "/etc/systemd/system/nginx.service" ] || [ -f "/usr/lib/systemd/system/nginx.service" ]; then
    error "服务文件仍存在"
else
    echo -e "${GREEN}已删除${NC}"
fi

# 12. 清理脚本自身
read -p "是否删除此清理脚本？(y/N): " delete_script
if [[ $delete_script =~ ^[Yy]$ ]]; then
    log "删除清理脚本..."
    rm -f "$0"
fi

log "=== Nginx 彻底清除完成 ==="
echo "所有 Nginx 相关文件已被删除"
```



