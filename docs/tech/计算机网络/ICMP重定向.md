**ICMP 重定向攻击** 是一种网络攻击手段，攻击者通过发送伪造的ICMP重定向消息来恶意修改目标主机的路由表，从而劫持网络流量。

## 什么是ICMP重定向

### 正常情况下的ICMP重定向
```
主机A (192.168.1.10) → 路由器R1 (192.168.1.1) → 互联网
                            ↓
主机A ← ICMP重定向消息 ← 路由器R2 (192.168.1.2)
"请直接发送到R2，路径更优"
```

### 攻击原理
攻击者伪造ICMP重定向消息，告诉受害者："有更好的路由路径，请把数据发给我"

## 攻击详细过程

### 步骤1: 网络环境
```
受害者: 192.168.1.100
网关: 192.168.1.1
攻击者: 192.168.1.200
目标服务器: 203.0.113.50
```

### 步骤2: 正常通信
```bash
# 受害者正常访问互联网
受害者 → 网关 → 互联网 → 目标服务器
```

### 步骤3: 攻击者发送伪造ICMP重定向
```python
# 攻击者伪造的数据包
ICMP 重定向消息:
- 类型: 5 (重定向)
- 代码: 1 (主机重定向)
- 网关地址: 192.168.1.200  # 攻击者IP
- 原始IP头: 受害者->目标服务器的IP包
```

### 步骤4: 受害者路由表被修改
```bash
# 攻击前路由表
受害者$ route -n
Destination     Gateway         Genmask
0.0.0.0         192.168.1.1     0.0.0.0

# 攻击后路由表（临时修改）
受害者$ route -n  
Destination     Gateway         Genmask
203.0.113.50    192.168.1.200   255.255.255.255
```

### 步骤5: 流量被劫持
```
受害者 → 攻击者(192.168.1.200) → ? 
                     ↓
              攻击者可以：监听、修改、丢弃数据
```

## 具体攻击技术实现

### 使用工具实施攻击
```bash
# 使用 hping3 发送ICMP重定向
hping3 --icmp --icmp-redit -a 192.168.1.1 -R 192.168.1.200 -c 1 192.168.1.100

# 参数解释：
# --icmp: 使用ICMP协议
# --icmp-redit: ICMP重定向
# -a 192.168.1.1: 伪造网关IP
# -R 192.168.1.200: 重定向到攻击者
# 192.168.1.100: 受害者IP
```

### ICMP重定向数据包结构
```
以太网头:
  源MAC: 攻击者MAC
  目标MAC: 受害者MAC
IP头:
  源IP: 192.168.1.1 (伪造网关)
  目标IP: 192.168.1.100 (受害者)
ICMP重定向消息:
  类型: 5
  代码: 1 (主机重定向)  
  网关地址: 192.168.1.200 (攻击者)
  原始IP包: 受害者->目标服务器的IP头+8字节数据
```

## 攻击的危害

### 1. **中间人攻击 (Man-in-the-Middle)**
```
用户 ←→ 攻击者 ←→ 真实服务器
    监听所有通信
```

### 2. **数据窃取**
- 用户名密码
- 信用卡信息  
- 私人聊天记录

### 3. **数据篡改**
```javascript
// 攻击者修改HTTP响应
// 原始响应
{"status": "success", "balance": 1000}

// 篡改后响应  
{"status": "success", "balance": 10}
```

### 4. **服务拒绝**
- 丢弃特定数据包
- 重定向到不存在的主机

## 防御措施

### 系统级防御
```bash
# Linux 禁用ICMP重定向接收
echo 0 > /proc/sys/net/ipv4/conf/all/accept_redirects
echo 0 > /proc/sys/net/ipv4/conf/eth0/accept_redirects

# 或永久配置
echo 'net.ipv4.conf.all.accept_redirects = 0' >> /etc/sysctl.conf
```

### 网络设备防御
```bash
# 路由器配置 - 过滤可疑ICMP重定向
access-list 101 deny icmp any any redirect
access-list 101 permit ip any any
```

### 前端开发者注意事项
虽然前端代码无法直接防御此类攻击，但要：

1. **使用HTTPS**
```javascript
// 强制使用HTTPS
const API_BASE_URL = 'https://api.example.com';
```

2. **证书验证**
```javascript
// Node.js中严格验证证书
const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: true
});
```

3. **安全头设置**
```nginx
# 后端配置安全头
add_header Strict-Transport-Security "max-age=31536000";
```

## 检测方法

### 网络监控
```bash
# 使用tcpdump检测ICMP重定向
tcpdump -i eth0 'icmp[icmptype] == icmp-redirect'

# 检查路由表变化
netstat -rn
```

### 系统日志检查
```bash
# 查看系统日志中的ICMP消息
grep -i "icmp.*redirect" /var/log/syslog
```

## 总结

**ICMP重定向攻击**就是攻击者冒充网络设备，发送"路线优化建议"，实际上是把流量引导到自己的控制下，从而实施监听或篡改。

对于前端开发者来说，最重要的防御就是**全站HTTPS**，这样即使流量被劫持，攻击者也无法解密加密的数据。