 https://docs.docker.com/engine/install/  安装文档

docker 的本质就是使用 Linux 的内核机制（LXC）隔离进程和系统

| 名称                  | 作用                                                        | 类比现实世界                       |
| --------------------- | ----------------------------------------------------------- | :--------------------------------- |
| **镜像（Image）**     | 类似一份*程序安装包 / 模板*，不能直接运行，需要用它创建容器 | 软件的“安装包”（比如QQ安装包）     |
| **容器（Container）** | 镜像运行后的实例，就是实际在运行的程序环境                  | 安装并打开后的“QQ程序本体”         |
| **卷（Volume）**      | 专门用来给容器存放数据的持久化存储                          | U盘 / 外接硬盘，容器重启了数据还在 |
| **网络映射 `-p`**     | 将**容器内部端口映射到宿主机**，外部才能访问容器服务        | 把房子的 WiFi 信号“共享”出来       |

命名规则：

| 类型                  | 命名建议规则                      | 示例                                            | 说明                     |
| --------------------- | --------------------------------- | ----------------------------------------------- | ------------------------ |
| **镜像（Image）**     | `[registry/][namespace/]name:tag` | `61.1.1.1:3000/public/nginx/nginx_amd64:1.24.0` | 建议全小写，tag 用版本号 |
| **容器（Container）** | `<应用-用途-环境>`                | `nginx-web-prod` / `redis-cache-dev`            | 避免默认随机名称         |
| **卷（Volume）**      | `<项目-用途-data>`                | `myapp-db-data` / `nginx-log-data`              | 体现作用，便于查找       |
| **网络（Network）**   | `<项目-网络类型>`                 | `myapp-bridge` / `myapp-overlay`                | 统一管理通信逻辑         |

生产环境部署流程：

Vue 项目源码
     │
     ▼
npm run build
     │
     ▼
dist/ 静态文件
     │
     ▼
Dockerfile 构建镜像
     │
     ▼
docker build -> 镜像包
     │
     ▼
镜像包上传服务器 (docker load 或 docker push)
     │
     ▼
docker run -> 容器运行 (Nginx 提供静态服务)
     │
     ▼
访问 http://server:port

### 1.常见的docker命令

| **命令**                                                     | **作用**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `docker load -i xxx.tar `                                    | 加载镜像                                                     |
| `	docker stop 容器名称`                                   | 停止容器运行                                                 |
| `docker rm 删除容器名称 `                                    | 删除容器                                                     |
| `	docker rmi 镜像名称:版本号`                             | 删除镜像                                                     |
| `	docker save -o xxx.tar 镜像名称:版本号`                 | 导出镜像包到本地                                             |
| ` docker build --platform linux/amd64 -t 镜像名称:版本号 -f Dockerfile .` | 静态文件打包成镜像                                           |
| `docker push 61.169.171.82:37080/public/镜像名称:版本号 `    | 推送镜像包到镜像仓库                                         |
| `docker run -d --restart=always --name my-vue-app -p 8080:80 myapp:latest` | 运行容器                                                     |
| `docker run -d --restart=always --name my-vue-app -p 8080:80 -v 服务器文件路径:/app/dist/config.js myapp:latest ` | 运行容器 + 挂载文件                                          |
| `docker ps -a`                                               | 查看容器（包括已经停止运行的）                               |
| `docker images`                                              | 查看已经加载的镜像                                           |
| `docker exec -it 容器ID|容器名称 /base/sh`                   | 进入容器, -i 启用交互  -t 新建终端容器名称 进入容器          |
| `docker logs -n 5 -f 容器ID|容器名称`                        | 查看容器运行时输出的日志。 -f 持续监控， -n 5  显示最后五行：` |
| `docker restart <容器ID 或 容器名称>`                        | 重启容器                                                     |
| `docker pull <镜像名称>:<标签`                               | 拉取镜像                                                     |
| `docker tag nginx:1.24.0 my-nginx:1.25`                      | 同一个镜像 ID **起一个新的名字/标签**                        |
| ` docker ps grep 容器名称 `                                  | 模糊搜索                                                     |
| ` docker inspect容器名称`                                    | 查看容器详细信息                                             |
| `chmod +x build-docker.sh`                                   | 脚本赋予权限                                                 |
| `docker inspect compliance-cec:latest grep Architecture `    | 查看镜像什么架构                                             |
| `history |grep docker`                                       | 结合 `grep` 查找特定命令                                     |
| `docker exec -it yz-cec-admin nginx -v`                      | 查看容器nginx版本                                            |

```
docker run

​	-d : 后台运行

​	--name  : 指定容器名称

​	--rm : 和 -d 冲突，表示运行一次停止之后 自动删除该容器

​	--restart unless-stopped  :  自动重启容器（开机自动启动）

​	-p : 映射网络端口    宿主机端口:容器内端口    -p 8180:80 

​	-e: ：配置环境变量（系统）

​	-v : 挂载文件夹或者文件到容器内，持久化数据使用
```

1.2.使用deno镜像跑nuxt3官网

Dockerfile 脚本

```dockerfile
FROM denoland/deno:alpine-2.4.4
# FROM node:24

ADD .output /app

WORKDIR /app

ENV PORT=80

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "server/index.mjs"]
# CMD ["node", "server/index.mjs"]
```

1.3Makefile脚本

```
# 发布版本 make version=0.0.1 release
# 版本
default_version = $(shell git describe --tags --always --dirty)
version ?= $(default_version)

build:
	yarn run nuxt build

docker-build:
	docker build --platform linux/amd64 -t edata_website:$(version) -f Dockerfile .

docker-save:
	docker save --platform linux/amd64 -o edata_website_$(version).tar edata_website:$(version)
# 服务器
#   docker run -d --restart unless-stopped --name edata_website -p 3000:80 edata_website:0.0.1
# docker-run:
# 	docker run -d --restart unless-stopped --name edata_website -p 3000:80 edata_website:$(version)


release:build docker-build docker-save ssh-push ssh-docker-stop ssh-docker-rm ssh-docker-load ssh-docker-run


ssh-push:
	scp edata_website_$(version).tar root@121.43.100.86:~/edata_website_$(version).tar

ssh-docker-stop:
	ssh root@121.43.100.86 "docker stop edata_website"

ssh-docker-rm:
	ssh root@121.43.100.86 "docker rm edata_website"

ssh-docker-load:
	ssh root@121.43.100.86 "docker load -i /root/edata_website_$(version).tar"

ssh-docker-run:
	ssh root@121.43.100.86 "docker run -d --restart unless-stopped --name edata_website -p 3000:80 edata_website:$(version)"
```

1.4Nginx代理配置

```
server {
    listen 80;
    listen [::]:80;
    server_name 5edata.com www.5edata.com;

    # 反向代理到 Node 服务
    location / {
        proxy_pass http://127.0.0.1:3000;
    }

    access_log /root/official_website/website.log;
}
```

2.Vue打包部署

Dockerfile

```dockerfile
FROM nginx:1.24.0  # 本地编译过后的Nginx

ADD dist /app/dist
ADD nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80  #默认80端口
```

根目录nginx.conf

```
#user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen 80;
        location / {
            root    /app/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
}
```

Makefile

```
# 部署开发版本： make version=x.x.x kiafa
# 部署演示版本： make version=x.x.x mod=demo yanshi
# 导出客户环境 arm 版本：make version=x.x.x platform=linux/arm64 deploy-export

# 前端构建工具
BUILD_TOOL = yarn

# 项目名称
PROJECT_NAME = data_registry


# 发布版本
version = $(shell git describe --tags --always --dirty)   # make 命令后面必须跟 version=x.x.x <自定义指令>
# 发布平台
platform = linux/amd64   # 默认为 x86_64 平台，可选 linux/arm64
# 发布环境
# 发布环境 演示环境：demo 开发环境：dev
mod = dev

# 镜像仓库地址
REGISTRY = 61.169.171.82:37080/public/
# 镜像名称
IMAGE_NAME = $(PROJECT_NAME)_web_ui_$(mod)
# 镜像全名
IMAGE_FULL_NAME_ARM = $(REGISTRY)$(IMAGE_NAME)_arm:$(version)
IMAGE_FULL_NAME_X86 = $(REGISTRY)$(IMAGE_NAME)_x86:$(version)

# 镜像导出存放位置(文件夹)
IMAGE_SAVE_DIR = dist_images
# 镜像导出文件名
IMAGE_SAVE_NAME = $(IMAGE_NAME)_$(version)

# 部署服务器地址
SSH_HOST = 61.169.171.82
# 部署服务器 SSH 端口
SSH_PORT = 12023
# 部署服务器用户
SSH_USER = root
# 镜像上传位置（服务器文件路径）
SSH_UPLOAD_DIR = /root/project/ui/$(PROJECT_NAME)_$(mod)/images


# 容器端口号
CONTAINER_PORT = 8002
ifeq ($(mod),demo)
	CONTAINER_PORT = 8003
endif
ifeq ($(mod),coca)
	CONTAINER_PORT = 8006
endif
# 容器名称
CONTAINER_NAME = $(IMAGE_NAME)

# 配置文件挂载参数
CONTAINER_CONFIG = /root/project/ui/$(PROJECT_NAME)_$(mod)/config.js

# 容器完整参数
CONTAINER_ARGS = -d --name $(CONTAINER_NAME) --restart unless-stopped -p $(CONTAINER_PORT):80 -v $(CONTAINER_CONFIG):/app/dist/config.js

# ============================================ 一键指令 ==========================================================

# 发布运行
kaifa: build-kaifa docker-build docker-save docker-clean ssh-upload ssh-run ssh-clean
yanshi: build-yanshi docker-build docker-save docker-clean ssh-upload ssh-run ssh-clean
kaifa-avtion: build-kaifa docker-build ssh-run
# 导出镜像
deploy-export: build-zhongdian docker-build docker-save docker-clean
#可乐
coca: build-coca docker-build docker-save docker-clean ssh-upload ssh-run ssh-clean
# ============================================ 项目指令 ==========================================================
build:
	$(BUILD_TOOL) run build-only 
# 可乐环境	
build-kaifa:
	$(BUILD_TOOL) run build-kaifa
# 演示环境
build-yanshi:
	$(BUILD_TOOL) run build-yanshi
# 中电环境	
build-zhongdian:
	$(BUILD_TOOL) run build-zhongdian 
# 可口可乐环境	
build-coca:
	$(BUILD_TOOL) run build-coca
# ============================================ Docker 指令 ==========================================================
docker-build:
ifeq ($(platform),linux/arm64)
	docker build --platform $(platform) --pull=false  -t $(IMAGE_FULL_NAME_ARM) -f Dockerfile.arm .
else
	docker build --platform $(platform) --pull=false  -t $(IMAGE_FULL_NAME_X86) -f Dockerfile .
endif

docker-save:
ifeq ($(platform),linux/arm64)
	docker save -o $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME)_arm.tar $(IMAGE_FULL_NAME_ARM)
else
	docker save -o $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME).tar $(IMAGE_FULL_NAME_X86)
endif

docker-clean:
ifeq ($(platform),linux/arm64)
	docker rmi $(IMAGE_FULL_NAME_ARM)
else
	docker rmi $(IMAGE_FULL_NAME_X86)
endif

# ============================================ 远程部署指令 ==========================================================
ssh-upload:
ifeq ($(platform),linux/arm64)
	scp -P $(SSH_PORT) $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME)_arm.tar $(SSH_USER)@$(SSH_HOST):$(SSH_UPLOAD_DIR)
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "docker load -i $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_NAME)_arm.tar"
else
	scp -P $(SSH_PORT) $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME).tar $(SSH_USER)@$(SSH_HOST):$(SSH_UPLOAD_DIR)
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "docker load -i $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_NAME).tar"
endif

ssh-run:
ifeq ($(platform),linux/arm64)
	- ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)"
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "docker run $(CONTAINER_ARGS) $(IMAGE_FULL_NAME_ARM)"
else
	- ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)"
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "docker run $(CONTAINER_ARGS) $(IMAGE_FULL_NAME_X86)"
endif

ssh-clean:
ifeq ($(platform),linux/arm64)
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME)_arm.tar"
else
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME).tar"
endif

last:
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "docker ps -f \"name=$(CONTAINER_NAME)\" | awk 'NR>1 {print $$2}'"
```

乾坤部署

build-docker.sh

```
#!/bin/bash

# Docker 构建脚本
# 用于自动化构建和部署 Vue 应用镜像
# 使用方式: ./build-docker.sh [镜像标签]

# 设置默认值
TAG=${1:-latest}
IMAGE_NAME="compliance-cec"
REGISTRY="61.169.171.82:37080/public/"
TAR_FILE="cec-admin.tar.gz"
DOCKERFILE="Dockerfile_cec_admin_dalian"

MODULES=("cec" "cec-doms" "cec-drws" "cec-login" "cec-trade")

# 清理工作上次残余文件
echo "🧹 清理临时文件..."
rm -rf "$TEMP_DIR"
rm -f $TAR_FILE
echo "✅ 清理完成!"

# 步骤1: 构建前端应用
echo "🔨 开始构建前端应用"
pnpm run build:staging

if [ $? -ne 0 ]; then
  echo "❌ 前端构建失败!"
  exit 1
fi
echo "✅ 前端构建成功!"

# 步骤2: 准备静态文件
echo "📦 打包静态文件到 $TAR_FILE"
# 创建临时目录
TEMP_DIR=$(mktemp -d)
DIST_DIR="$TEMP_DIR/zzdit"

# 创建目标目录
mkdir -p "$DIST_DIR"

# 收集所有构建好的子模块
for module in "${MODULES[@]}"; do
  module_dist="apps/$module/dist"
  if [ -d "$module_dist" ]; then
    # 替换目录名中的 cec 为 zzdit
    new_module=${module/cec/zzdit}
    
    if [[ "$module" == "cec" ]]; then
      # 主模块内容直接放入 zzdit 目录
      echo "  添加模块: $module → zzdit/"
      cp -r "$module_dist"/* "$DIST_DIR/"
    else
      # 子模块放入 zzdit-xxx 目录
      echo "  添加模块: $module → zzdit/$new_module"
      cp -r "$module_dist" "$DIST_DIR/$new_module"
    fi
  else
    echo "⚠️  模块 $module 的构建目录不存在，跳过"
  fi
done

# 添加公共组件
components_dist="packages/components/dist"
if [ -d "$components_dist" ]; then
  # 组件目录改为 zzdit/components
  echo "  添加公共组件 → zzdit/components"
  mkdir -p "$DIST_DIR/components"
  cp -r "$components_dist" "$DIST_DIR/components/"
else
  echo "⚠️  公共组件目录不存在，跳过"
fi

# 打包目录名从 cec 改为 zzdit
tar -czf $TAR_FILE -C "$TEMP_DIR" zzdit

echo "✅ 静态文件打包完成!"

# 步骤3: 询问是否构建 Docker 镜像
read -p "🚢 是否构建 Docker 镜像? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "⏩ 跳过镜像构建"
  # 清理工作
  exit 0
fi

# 步骤4: 构建 Docker 镜像
echo "🐳 开始构建 Docker 镜像 ($IMAGE_NAME:$TAG)"
docker build -t $REGISTRY$IMAGE_NAME:$TAG \
  -f $DOCKERFILE .

if [ $? -ne 0 ]; then
  echo "❌ Docker 镜像构建失败!"
  exit 1
fi
echo "✅ Docker 镜像构建成功!"

# 步骤5: 推送镜像到仓库 (可选)
read -p "🚀 是否推送镜像到注册中心? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "📡 推送镜像到 $REGISTRY$IMAGE_NAME:$TAG"
  docker push $REGISTRY$IMAGE_NAME:$TAG
  echo "✅ 镜像推送成功!"
fi

echo "🎉 所有操作已完成! 镜像: $REGISTRY$IMAGE_NAME:$TAG"
```

Dockerfile_cec_admin_dalian

```
# 使用 Alpine Linux 作为基础镜像
FROM registry.kubeease.cn/library/nginx:1.24.0-alpine3.17-slim

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 将当前目录下的静态文件复制到工作目录中
ADD cec-admin.tar.gz  /usr/share/nginx/html

# （可选）如果你需要使用环境变量，可以使用 ENV 指令设置
ENV TZ=Asia/Shanghai

# 暴露服务端口
EXPOSE 10091

CMD ["nginx", "-g", "daemon off;"]

```





