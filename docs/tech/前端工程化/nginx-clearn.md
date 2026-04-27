清理Nginx

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

