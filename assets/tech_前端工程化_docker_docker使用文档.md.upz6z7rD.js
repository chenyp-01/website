import{_ as n,c as a,o as p,al as e}from"./chunks/framework.QMC68jD7.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tech/前端工程化/docker/docker使用文档.md","filePath":"tech/前端工程化/docker/docker使用文档.md","lastUpdated":1777273084000}'),l={name:"tech/前端工程化/docker/docker使用文档.md"};function i(r,s,c,t,b,u){return p(),a("div",null,[...s[0]||(s[0]=[e(`<p><a href="https://docs.docker.com/engine/install/" target="_blank" rel="noreferrer">https://docs.docker.com/engine/install/</a> 安装文档</p><p>docker 的本质就是使用 Linux 的内核机制（LXC）隔离进程和系统</p><table tabindex="0"><thead><tr><th>名称</th><th>作用</th><th style="text-align:left;">类比现实世界</th></tr></thead><tbody><tr><td><strong>镜像（Image）</strong></td><td>类似一份<em>程序安装包 / 模板</em>，不能直接运行，需要用它创建容器</td><td style="text-align:left;">软件的“安装包”（比如QQ安装包）</td></tr><tr><td><strong>容器（Container）</strong></td><td>镜像运行后的实例，就是实际在运行的程序环境</td><td style="text-align:left;">安装并打开后的“QQ程序本体”</td></tr><tr><td><strong>卷（Volume）</strong></td><td>专门用来给容器存放数据的持久化存储</td><td style="text-align:left;">U盘 / 外接硬盘，容器重启了数据还在</td></tr><tr><td><strong>网络映射 <code>-p</code></strong></td><td>将<strong>容器内部端口映射到宿主机</strong>，外部才能访问容器服务</td><td style="text-align:left;">把房子的 WiFi 信号“共享”出来</td></tr></tbody></table><p>命名规则：</p><table tabindex="0"><thead><tr><th>类型</th><th>命名建议规则</th><th>示例</th><th>说明</th></tr></thead><tbody><tr><td><strong>镜像（Image）</strong></td><td><code>[registry/][namespace/]name:tag</code></td><td><code>61.1.1.1:3000/public/nginx/nginx_amd64:1.24.0</code></td><td>建议全小写，tag 用版本号</td></tr><tr><td><strong>容器（Container）</strong></td><td><code>&lt;应用-用途-环境&gt;</code></td><td><code>nginx-web-prod</code> / <code>redis-cache-dev</code></td><td>避免默认随机名称</td></tr><tr><td><strong>卷（Volume）</strong></td><td><code>&lt;项目-用途-data&gt;</code></td><td><code>myapp-db-data</code> / <code>nginx-log-data</code></td><td>体现作用，便于查找</td></tr><tr><td><strong>网络（Network）</strong></td><td><code>&lt;项目-网络类型&gt;</code></td><td><code>myapp-bridge</code> / <code>myapp-overlay</code></td><td>统一管理通信逻辑</td></tr></tbody></table><p>生产环境部署流程：</p><p>Vue 项目源码 │ ▼ npm run build │ ▼ dist/ 静态文件 │ ▼ Dockerfile 构建镜像 │ ▼ docker build -&gt; 镜像包 │ ▼ 镜像包上传服务器 (docker load 或 docker push) │ ▼ docker run -&gt; 容器运行 (Nginx 提供静态服务) │ ▼ 访问 <a href="http://server" target="_blank" rel="noreferrer">http://server</a>:port</p><h3 id="_1-常见的docker命令" tabindex="-1">1.常见的docker命令 <a class="header-anchor" href="#_1-常见的docker命令" aria-label="Permalink to &quot;1.常见的docker命令&quot;">​</a></h3><table tabindex="0"><thead><tr><th><strong>命令</strong></th><th><strong>作用</strong></th></tr></thead><tbody><tr><td><code>docker load -i xxx.tar </code></td><td>加载镜像</td></tr><tr><td><code> docker stop 容器名称</code></td><td>停止容器运行</td></tr><tr><td><code>docker rm 删除容器名称 </code></td><td>删除容器</td></tr><tr><td><code> docker rmi 镜像名称:版本号</code></td><td>删除镜像</td></tr><tr><td><code> docker save -o xxx.tar 镜像名称:版本号</code></td><td>导出镜像包到本地</td></tr><tr><td><code> docker build --platform linux/amd64 -t 镜像名称:版本号 -f Dockerfile .</code></td><td>静态文件打包成镜像</td></tr><tr><td><code>docker push 61.169.171.82:37080/public/镜像名称:版本号 </code></td><td>推送镜像包到镜像仓库</td></tr><tr><td><code>docker run -d --restart=always --name my-vue-app -p 8080:80 myapp:latest</code></td><td>运行容器</td></tr><tr><td><code>docker run -d --restart=always --name my-vue-app -p 8080:80 -v 服务器文件路径:/app/dist/config.js myapp:latest </code></td><td>运行容器 + 挂载文件</td></tr><tr><td><code>docker ps -a</code></td><td>查看容器（包括已经停止运行的）</td></tr><tr><td><code>docker images</code></td><td>查看已经加载的镜像</td></tr><tr><td>\`docker exec -it 容器ID</td><td>容器名称 /base/sh\`</td></tr><tr><td>\`docker logs -n 5 -f 容器ID</td><td>容器名称\`</td></tr><tr><td><code>docker restart &lt;容器ID 或 容器名称&gt;</code></td><td>重启容器</td></tr><tr><td><code>docker pull &lt;镜像名称&gt;:&lt;标签</code></td><td>拉取镜像</td></tr><tr><td><code>docker tag nginx:1.24.0 my-nginx:1.25</code></td><td>同一个镜像 ID <strong>起一个新的名字/标签</strong></td></tr><tr><td><code>docker ps grep 容器名称</code></td><td>模糊搜索</td></tr><tr><td><code> docker inspect容器名称</code></td><td>查看容器详细信息</td></tr><tr><td><code>chmod +x build-docker.sh</code></td><td>脚本赋予权限</td></tr><tr><td><code>docker inspect compliance-cec:latest grep Architecture </code></td><td>查看镜像什么架构</td></tr><tr><td>\`history</td><td>grep docker\`</td></tr><tr><td><code>docker exec -it yz-cec-admin nginx -v</code></td><td>查看容器nginx版本</td></tr></tbody></table><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​	-d : 后台运行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​	--name  : 指定容器名称</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​	--rm : 和 -d 冲突，表示运行一次停止之后 自动删除该容器</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​	--restart unless-stopped  :  自动重启容器（开机自动启动）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​	-p : 映射网络端口    宿主机端口:容器内端口    -p 8180:80 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>​	-e: ：配置环境变量（系统）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​	-v : 挂载文件夹或者文件到容器内，持久化数据使用</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>1.2.使用deno镜像跑nuxt3官网</p><p>Dockerfile 脚本</p><div class="language-dockerfile vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> denoland/deno:alpine-2.4.4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># FROM node:24</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> .output /app</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /app</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ENV</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PORT=80</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deno&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;run&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--allow-net&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--allow-read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--allow-env&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;server/index.mjs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CMD [&quot;node&quot;, &quot;server/index.mjs&quot;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>1.3Makefile脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 发布版本 make version=0.0.1 release</span></span>
<span class="line"><span># 版本</span></span>
<span class="line"><span>default_version = $(shell git describe --tags --always --dirty)</span></span>
<span class="line"><span>version ?= $(default_version)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>build:</span></span>
<span class="line"><span>	yarn run nuxt build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker-build:</span></span>
<span class="line"><span>	docker build --platform linux/amd64 -t edata_website:$(version) -f Dockerfile .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker-save:</span></span>
<span class="line"><span>	docker save --platform linux/amd64 -o edata_website_$(version).tar edata_website:$(version)</span></span>
<span class="line"><span># 服务器</span></span>
<span class="line"><span>#   docker run -d --restart unless-stopped --name edata_website -p 3000:80 edata_website:0.0.1</span></span>
<span class="line"><span># docker-run:</span></span>
<span class="line"><span># 	docker run -d --restart unless-stopped --name edata_website -p 3000:80 edata_website:$(version)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>release:build docker-build docker-save ssh-push ssh-docker-stop ssh-docker-rm ssh-docker-load ssh-docker-run</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh-push:</span></span>
<span class="line"><span>	scp edata_website_$(version).tar root@121.43.100.86:~/edata_website_$(version).tar</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh-docker-stop:</span></span>
<span class="line"><span>	ssh root@121.43.100.86 &quot;docker stop edata_website&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh-docker-rm:</span></span>
<span class="line"><span>	ssh root@121.43.100.86 &quot;docker rm edata_website&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh-docker-load:</span></span>
<span class="line"><span>	ssh root@121.43.100.86 &quot;docker load -i /root/edata_website_$(version).tar&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh-docker-run:</span></span>
<span class="line"><span>	ssh root@121.43.100.86 &quot;docker run -d --restart unless-stopped --name edata_website -p 3000:80 edata_website:$(version)&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>1.4Nginx代理配置</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    listen [::]:80;</span></span>
<span class="line"><span>    server_name 5edata.com www.5edata.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 反向代理到 Node 服务</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        proxy_pass http://127.0.0.1:3000;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    access_log /root/official_website/website.log;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>2.Vue打包部署</p><p>Dockerfile</p><div class="language-dockerfile vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nginx:1.24.0  # 本地编译过后的Nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dist /app/dist</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nginx.conf /etc/nginx/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># EXPOSE 80  #默认80端口</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>根目录nginx.conf</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#user  nobody;</span></span>
<span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections  1024;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span>    #tcp_nopush     on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #keepalive_timeout  0;</span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #gzip  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 80;</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root    /app/dist;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>            try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        location @router {</span></span>
<span class="line"><span>            rewrite ^.*$ /index.html last;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>Makefile</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 部署开发版本： make version=x.x.x kiafa</span></span>
<span class="line"><span># 部署演示版本： make version=x.x.x mod=demo yanshi</span></span>
<span class="line"><span># 导出客户环境 arm 版本：make version=x.x.x platform=linux/arm64 deploy-export</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 前端构建工具</span></span>
<span class="line"><span>BUILD_TOOL = yarn</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 项目名称</span></span>
<span class="line"><span>PROJECT_NAME = data_registry</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 发布版本</span></span>
<span class="line"><span>version = $(shell git describe --tags --always --dirty)   # make 命令后面必须跟 version=x.x.x &lt;自定义指令&gt;</span></span>
<span class="line"><span># 发布平台</span></span>
<span class="line"><span>platform = linux/amd64   # 默认为 x86_64 平台，可选 linux/arm64</span></span>
<span class="line"><span># 发布环境</span></span>
<span class="line"><span># 发布环境 演示环境：demo 开发环境：dev</span></span>
<span class="line"><span>mod = dev</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 镜像仓库地址</span></span>
<span class="line"><span>REGISTRY = 61.169.171.82:37080/public/</span></span>
<span class="line"><span># 镜像名称</span></span>
<span class="line"><span>IMAGE_NAME = $(PROJECT_NAME)_web_ui_$(mod)</span></span>
<span class="line"><span># 镜像全名</span></span>
<span class="line"><span>IMAGE_FULL_NAME_ARM = $(REGISTRY)$(IMAGE_NAME)_arm:$(version)</span></span>
<span class="line"><span>IMAGE_FULL_NAME_X86 = $(REGISTRY)$(IMAGE_NAME)_x86:$(version)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 镜像导出存放位置(文件夹)</span></span>
<span class="line"><span>IMAGE_SAVE_DIR = dist_images</span></span>
<span class="line"><span># 镜像导出文件名</span></span>
<span class="line"><span>IMAGE_SAVE_NAME = $(IMAGE_NAME)_$(version)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 部署服务器地址</span></span>
<span class="line"><span>SSH_HOST = 61.169.171.82</span></span>
<span class="line"><span># 部署服务器 SSH 端口</span></span>
<span class="line"><span>SSH_PORT = 12023</span></span>
<span class="line"><span># 部署服务器用户</span></span>
<span class="line"><span>SSH_USER = root</span></span>
<span class="line"><span># 镜像上传位置（服务器文件路径）</span></span>
<span class="line"><span>SSH_UPLOAD_DIR = /root/project/ui/$(PROJECT_NAME)_$(mod)/images</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 容器端口号</span></span>
<span class="line"><span>CONTAINER_PORT = 8002</span></span>
<span class="line"><span>ifeq ($(mod),demo)</span></span>
<span class="line"><span>	CONTAINER_PORT = 8003</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span>ifeq ($(mod),coca)</span></span>
<span class="line"><span>	CONTAINER_PORT = 8006</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span># 容器名称</span></span>
<span class="line"><span>CONTAINER_NAME = $(IMAGE_NAME)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置文件挂载参数</span></span>
<span class="line"><span>CONTAINER_CONFIG = /root/project/ui/$(PROJECT_NAME)_$(mod)/config.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 容器完整参数</span></span>
<span class="line"><span>CONTAINER_ARGS = -d --name $(CONTAINER_NAME) --restart unless-stopped -p $(CONTAINER_PORT):80 -v $(CONTAINER_CONFIG):/app/dist/config.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ============================================ 一键指令 ==========================================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 发布运行</span></span>
<span class="line"><span>kaifa: build-kaifa docker-build docker-save docker-clean ssh-upload ssh-run ssh-clean</span></span>
<span class="line"><span>yanshi: build-yanshi docker-build docker-save docker-clean ssh-upload ssh-run ssh-clean</span></span>
<span class="line"><span>kaifa-avtion: build-kaifa docker-build ssh-run</span></span>
<span class="line"><span># 导出镜像</span></span>
<span class="line"><span>deploy-export: build-zhongdian docker-build docker-save docker-clean</span></span>
<span class="line"><span>#可乐</span></span>
<span class="line"><span>coca: build-coca docker-build docker-save docker-clean ssh-upload ssh-run ssh-clean</span></span>
<span class="line"><span># ============================================ 项目指令 ==========================================================</span></span>
<span class="line"><span>build:</span></span>
<span class="line"><span>	$(BUILD_TOOL) run build-only </span></span>
<span class="line"><span># 可乐环境	</span></span>
<span class="line"><span>build-kaifa:</span></span>
<span class="line"><span>	$(BUILD_TOOL) run build-kaifa</span></span>
<span class="line"><span># 演示环境</span></span>
<span class="line"><span>build-yanshi:</span></span>
<span class="line"><span>	$(BUILD_TOOL) run build-yanshi</span></span>
<span class="line"><span># 中电环境	</span></span>
<span class="line"><span>build-zhongdian:</span></span>
<span class="line"><span>	$(BUILD_TOOL) run build-zhongdian </span></span>
<span class="line"><span># 可口可乐环境	</span></span>
<span class="line"><span>build-coca:</span></span>
<span class="line"><span>	$(BUILD_TOOL) run build-coca</span></span>
<span class="line"><span># ============================================ Docker 指令 ==========================================================</span></span>
<span class="line"><span>docker-build:</span></span>
<span class="line"><span>ifeq ($(platform),linux/arm64)</span></span>
<span class="line"><span>	docker build --platform $(platform) --pull=false  -t $(IMAGE_FULL_NAME_ARM) -f Dockerfile.arm .</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>	docker build --platform $(platform) --pull=false  -t $(IMAGE_FULL_NAME_X86) -f Dockerfile .</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker-save:</span></span>
<span class="line"><span>ifeq ($(platform),linux/arm64)</span></span>
<span class="line"><span>	docker save -o $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME)_arm.tar $(IMAGE_FULL_NAME_ARM)</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>	docker save -o $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME).tar $(IMAGE_FULL_NAME_X86)</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker-clean:</span></span>
<span class="line"><span>ifeq ($(platform),linux/arm64)</span></span>
<span class="line"><span>	docker rmi $(IMAGE_FULL_NAME_ARM)</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>	docker rmi $(IMAGE_FULL_NAME_X86)</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ============================================ 远程部署指令 ==========================================================</span></span>
<span class="line"><span>ssh-upload:</span></span>
<span class="line"><span>ifeq ($(platform),linux/arm64)</span></span>
<span class="line"><span>	scp -P $(SSH_PORT) $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME)_arm.tar $(SSH_USER)@$(SSH_HOST):$(SSH_UPLOAD_DIR)</span></span>
<span class="line"><span>	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;docker load -i $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_NAME)_arm.tar&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>	scp -P $(SSH_PORT) $(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME).tar $(SSH_USER)@$(SSH_HOST):$(SSH_UPLOAD_DIR)</span></span>
<span class="line"><span>	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;docker load -i $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_NAME).tar&quot;</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh-run:</span></span>
<span class="line"><span>ifeq ($(platform),linux/arm64)</span></span>
<span class="line"><span>	- ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;docker stop $(CONTAINER_NAME) &amp;&amp; docker rm $(CONTAINER_NAME)&quot;</span></span>
<span class="line"><span>	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;docker run $(CONTAINER_ARGS) $(IMAGE_FULL_NAME_ARM)&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>	- ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;docker stop $(CONTAINER_NAME) &amp;&amp; docker rm $(CONTAINER_NAME)&quot;</span></span>
<span class="line"><span>	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;docker run $(CONTAINER_ARGS) $(IMAGE_FULL_NAME_X86)&quot;</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh-clean:</span></span>
<span class="line"><span>ifeq ($(platform),linux/arm64)</span></span>
<span class="line"><span>	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;rm -rf $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME)_arm.tar&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;rm -rf $(SSH_UPLOAD_DIR)/$(IMAGE_SAVE_DIR)/$(IMAGE_SAVE_NAME).tar&quot;</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>last:</span></span>
<span class="line"><span>	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) &quot;docker ps -f \\&quot;name=$(CONTAINER_NAME)\\&quot; | awk &#39;NR&gt;1 {print $$2}&#39;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br></div></div><p>乾坤部署</p><p>build-docker.sh</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Docker 构建脚本</span></span>
<span class="line"><span># 用于自动化构建和部署 Vue 应用镜像</span></span>
<span class="line"><span># 使用方式: ./build-docker.sh [镜像标签]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置默认值</span></span>
<span class="line"><span>TAG=\${1:-latest}</span></span>
<span class="line"><span>IMAGE_NAME=&quot;compliance-cec&quot;</span></span>
<span class="line"><span>REGISTRY=&quot;61.169.171.82:37080/public/&quot;</span></span>
<span class="line"><span>TAR_FILE=&quot;cec-admin.tar.gz&quot;</span></span>
<span class="line"><span>DOCKERFILE=&quot;Dockerfile_cec_admin_dalian&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MODULES=(&quot;cec&quot; &quot;cec-doms&quot; &quot;cec-drws&quot; &quot;cec-login&quot; &quot;cec-trade&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 清理工作上次残余文件</span></span>
<span class="line"><span>echo &quot;🧹 清理临时文件...&quot;</span></span>
<span class="line"><span>rm -rf &quot;$TEMP_DIR&quot;</span></span>
<span class="line"><span>rm -f $TAR_FILE</span></span>
<span class="line"><span>echo &quot;✅ 清理完成!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 步骤1: 构建前端应用</span></span>
<span class="line"><span>echo &quot;🔨 开始构建前端应用&quot;</span></span>
<span class="line"><span>pnpm run build:staging</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ $? -ne 0 ]; then</span></span>
<span class="line"><span>  echo &quot;❌ 前端构建失败!&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>echo &quot;✅ 前端构建成功!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 步骤2: 准备静态文件</span></span>
<span class="line"><span>echo &quot;📦 打包静态文件到 $TAR_FILE&quot;</span></span>
<span class="line"><span># 创建临时目录</span></span>
<span class="line"><span>TEMP_DIR=$(mktemp -d)</span></span>
<span class="line"><span>DIST_DIR=&quot;$TEMP_DIR/zzdit&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建目标目录</span></span>
<span class="line"><span>mkdir -p &quot;$DIST_DIR&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 收集所有构建好的子模块</span></span>
<span class="line"><span>for module in &quot;\${MODULES[@]}&quot;; do</span></span>
<span class="line"><span>  module_dist=&quot;apps/$module/dist&quot;</span></span>
<span class="line"><span>  if [ -d &quot;$module_dist&quot; ]; then</span></span>
<span class="line"><span>    # 替换目录名中的 cec 为 zzdit</span></span>
<span class="line"><span>    new_module=\${module/cec/zzdit}</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if [[ &quot;$module&quot; == &quot;cec&quot; ]]; then</span></span>
<span class="line"><span>      # 主模块内容直接放入 zzdit 目录</span></span>
<span class="line"><span>      echo &quot;  添加模块: $module → zzdit/&quot;</span></span>
<span class="line"><span>      cp -r &quot;$module_dist&quot;/* &quot;$DIST_DIR/&quot;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>      # 子模块放入 zzdit-xxx 目录</span></span>
<span class="line"><span>      echo &quot;  添加模块: $module → zzdit/$new_module&quot;</span></span>
<span class="line"><span>      cp -r &quot;$module_dist&quot; &quot;$DIST_DIR/$new_module&quot;</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    echo &quot;⚠️  模块 $module 的构建目录不存在，跳过&quot;</span></span>
<span class="line"><span>  fi</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 添加公共组件</span></span>
<span class="line"><span>components_dist=&quot;packages/components/dist&quot;</span></span>
<span class="line"><span>if [ -d &quot;$components_dist&quot; ]; then</span></span>
<span class="line"><span>  # 组件目录改为 zzdit/components</span></span>
<span class="line"><span>  echo &quot;  添加公共组件 → zzdit/components&quot;</span></span>
<span class="line"><span>  mkdir -p &quot;$DIST_DIR/components&quot;</span></span>
<span class="line"><span>  cp -r &quot;$components_dist&quot; &quot;$DIST_DIR/components/&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  echo &quot;⚠️  公共组件目录不存在，跳过&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 打包目录名从 cec 改为 zzdit</span></span>
<span class="line"><span>tar -czf $TAR_FILE -C &quot;$TEMP_DIR&quot; zzdit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;✅ 静态文件打包完成!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 步骤3: 询问是否构建 Docker 镜像</span></span>
<span class="line"><span>read -p &quot;🚢 是否构建 Docker 镜像? (y/n) &quot; -n 1 -r</span></span>
<span class="line"><span>echo</span></span>
<span class="line"><span>if [[ ! $REPLY =~ ^[Yy]$ ]]; then</span></span>
<span class="line"><span>  echo &quot;⏩ 跳过镜像构建&quot;</span></span>
<span class="line"><span>  # 清理工作</span></span>
<span class="line"><span>  exit 0</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 步骤4: 构建 Docker 镜像</span></span>
<span class="line"><span>echo &quot;🐳 开始构建 Docker 镜像 ($IMAGE_NAME:$TAG)&quot;</span></span>
<span class="line"><span>docker build -t $REGISTRY$IMAGE_NAME:$TAG \\</span></span>
<span class="line"><span>  -f $DOCKERFILE .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ $? -ne 0 ]; then</span></span>
<span class="line"><span>  echo &quot;❌ Docker 镜像构建失败!&quot;</span></span>
<span class="line"><span>  exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>echo &quot;✅ Docker 镜像构建成功!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 步骤5: 推送镜像到仓库 (可选)</span></span>
<span class="line"><span>read -p &quot;🚀 是否推送镜像到注册中心? (y/n) &quot; -n 1 -r</span></span>
<span class="line"><span>echo</span></span>
<span class="line"><span>if [[ $REPLY =~ ^[Yy]$ ]]; then</span></span>
<span class="line"><span>  echo &quot;📡 推送镜像到 $REGISTRY$IMAGE_NAME:$TAG&quot;</span></span>
<span class="line"><span>  docker push $REGISTRY$IMAGE_NAME:$TAG</span></span>
<span class="line"><span>  echo &quot;✅ 镜像推送成功!&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;🎉 所有操作已完成! 镜像: $REGISTRY$IMAGE_NAME:$TAG&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br></div></div><p>Dockerfile_cec_admin_dalian</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 使用 Alpine Linux 作为基础镜像</span></span>
<span class="line"><span>FROM registry.kubeease.cn/library/nginx:1.24.0-alpine3.17-slim</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置工作目录</span></span>
<span class="line"><span>WORKDIR /usr/share/nginx/html</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 将当前目录下的静态文件复制到工作目录中</span></span>
<span class="line"><span>ADD cec-admin.tar.gz  /usr/share/nginx/html</span></span>
<span class="line"><span></span></span>
<span class="line"><span># （可选）如果你需要使用环境变量，可以使用 ENV 指令设置</span></span>
<span class="line"><span>ENV TZ=Asia/Shanghai</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 暴露服务端口</span></span>
<span class="line"><span>EXPOSE 10091</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CMD [&quot;nginx&quot;, &quot;-g&quot;, &quot;daemon off;&quot;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,29)])])}const m=n(l,[["render",i]]);export{o as __pageData,m as default};
