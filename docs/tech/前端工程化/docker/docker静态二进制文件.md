## 使用静态二进制文件安装docker

1. **下载静态二进制文件**：
```bash
# 在有网络的机器上下载
wget https://download.docker.com/linux/static/stable/x86_64/docker-20.10.7.tgz
```

2. **传输到目标机器并解压**：
```bash
tar xzvf docker-20.10.7.tgz
```

3. **复制到系统目录**：
```bash
sudo cp docker/* /usr/bin/
```

4. **创建 systemd 服务文件**：
```bash
sudo vi /etc/systemd/system/docker.service
```

内容如下：
```ini
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target

[Service]
Type=notify
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
TimeoutStartSec=0
Delegate=yes
KillMode=process
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target
```

5. **启动 Docker**：
```bash
sudo systemctl daemon-reload
sudo systemctl enable docker
sudo systemctl start docker
```

6. 二进制卸载Docker

```
# 停止 Docker 服务
sudo systemctl stop docker

# 删除二进制文件
sudo rm -f /usr/bin/docker
sudo rm -f /usr/bin/dockerd
sudo rm -f /usr/bin/docker-init
sudo rm -f /usr/bin/docker-proxy
sudo rm -f /usr/bin/containerd
sudo rm -f /usr/bin/containerd-shim
sudo rm -f /usr/bin/containerd-shim-runc-v2
sudo rm -f /usr/bin/ctr
sudo rm -f /usr/bin/runc

# 删除 systemd 服务文件
sudo rm -f /etc/systemd/system/docker.service
sudo systemctl daemon-reload

# 删除数据目录
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo rm -rf /etc/docker
```

