import{_ as n,c as a,o as p,al as l}from"./chunks/framework.QMC68jD7.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tech/前端工程化/nginx/Nginx使用文档.md","filePath":"tech/前端工程化/nginx/Nginx使用文档.md","lastUpdated":1777273084000}'),e={name:"tech/前端工程化/nginx/Nginx使用文档.md"};function i(r,s,c,t,b,u){return p(),a("div",null,[...s[0]||(s[0]=[l(`<h2 id="一、宿主机通过-yum-安装-nginx" tabindex="-1">一、宿主机通过 yum 安装 Nginx <a class="header-anchor" href="#一、宿主机通过-yum-安装-nginx" aria-label="Permalink to &quot;一、宿主机通过 yum 安装 Nginx&quot;">​</a></h2><p><strong>yum（Yellowdog Updater Modified）</strong> 是 <strong>RedHat / CentOS / Rocky / AlmaLinux 等 RPM 系统自带的包管理工具</strong></p><p>作用：安装、更新、卸载软件包</p><p><strong>一般系统自带</strong>，不需要手动安装</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Nginx 安装与 Docker 运行笔记</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 一、宿主机通过 yum 安装 Nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 1. 安装步骤</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`bash</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新系统仓库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 EPEL 仓库（部分系统需要）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> epel-release</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 nginx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动 nginx 服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置开机自启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="_2-常用命令" tabindex="-1">2. 常用命令 <a class="header-anchor" href="#_2-常用命令" aria-label="Permalink to &quot;2. 常用命令&quot;">​</a></h3><table tabindex="0"><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody><tr><td><code>nginx -t</code></td><td>测试配置是否正确</td></tr><tr><td><code>nginx -s reload</code></td><td>重新加载配置（不重启进程）</td></tr><tr><td><code>systemctl restart nginx</code></td><td>重启 nginx</td></tr><tr><td><code>tail -f /var/log/nginx/access.log</code></td><td>查看访问日志</td></tr><tr><td><code>tail -f /var/log/nginx/error.log</code></td><td>查看错误日志</td></tr></tbody></table><h3 id="_3-配置文件路径" tabindex="-1">3. 配置文件路径 <a class="header-anchor" href="#_3-配置文件路径" aria-label="Permalink to &quot;3. 配置文件路径&quot;">​</a></h3><table tabindex="0"><thead><tr><th>文件</th><th>说明</th></tr></thead><tbody><tr><td><code>/etc/nginx/nginx.conf</code></td><td>主配置文件</td></tr><tr><td><code>/etc/nginx/conf.d/*.conf</code></td><td>子配置文件，放站点配置</td></tr><tr><td><code>/usr/share/nginx/html</code></td><td>默认网站根目录</td></tr><tr><td><code>/var/log/nginx</code></td><td>日志目录</td></tr></tbody></table><hr><h2 id="二、使用-docker-运行-nginx" tabindex="-1">二、使用 Docker 运行 Nginx <a class="header-anchor" href="#二、使用-docker-运行-nginx" aria-label="Permalink to &quot;二、使用 Docker 运行 Nginx&quot;">​</a></h2><h3 id="_1-拉取官方-nginx-镜像" tabindex="-1">1. 拉取官方 Nginx 镜像 <a class="header-anchor" href="#_1-拉取官方-nginx-镜像" aria-label="Permalink to &quot;1. 拉取官方 Nginx 镜像&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-运行-nginx-容器-基础方式" tabindex="-1">2. 运行 Nginx 容器（基础方式） <a class="header-anchor" href="#_2-运行-nginx-容器-基础方式" aria-label="Permalink to &quot;2. 运行 Nginx 容器（基础方式）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8080:80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  nginx:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li><code>-d</code> → 后台运行</li><li><code>--name</code> → 容器名称</li><li><code>-p 8080:80</code> → 宿主机端口映射到容器 80</li></ul><p>访问 <code>http://服务器IP:8080</code> 查看效果。</p><h3 id="_3-挂载静态文件目录" tabindex="-1">3. 挂载静态文件目录 <a class="header-anchor" href="#_3-挂载静态文件目录" aria-label="Permalink to &quot;3. 挂载静态文件目录&quot;">​</a></h3><p>假设前端打包后的静态文件在 <code>/home/user/my-site</code>：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8080:80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/user/my-site:/usr/share/nginx/html:ro</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  nginx:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li><code>/home/user/my-site</code> → 宿主机打包好的静态文件</li><li><code>/usr/share/nginx/html</code> → 容器内部 Nginx 默认网站根目录</li><li><code>:ro</code> → 容器只读，不会修改宿主机文件</li></ul><h3 id="_4-挂载自定义配置文件" tabindex="-1">4. 挂载自定义配置文件 <a class="header-anchor" href="#_4-挂载自定义配置文件" aria-label="Permalink to &quot;4. 挂载自定义配置文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8080:80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/user/nginx.conf:/etc/nginx/nginx.conf:ro</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/user/my-site:/usr/share/nginx/html:ro</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  nginx:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>使用宿主机自定义配置覆盖容器默认配置</li><li>结合静态文件目录即可直接启动完整网站服务</li></ul><h3 id="_5-常用-docker-管理命令" tabindex="-1">5. 常用 Docker 管理命令 <a class="header-anchor" href="#_5-常用-docker-管理命令" aria-label="Permalink to &quot;5. 常用 Docker 管理命令&quot;">​</a></h3><table tabindex="0"><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody><tr><td><code>docker ps</code></td><td>查看运行中的容器</td></tr><tr><td><code>docker logs my-nginx</code></td><td>查看容器日志</td></tr><tr><td><code>docker exec -it my-nginx /bin/bash</code></td><td>进入容器</td></tr><tr><td><code>docker stop my-nginx</code></td><td>停止容器</td></tr><tr><td><code>docker start my-nginx</code></td><td>启动已停止容器</td></tr><tr><td><code>docker rm my-nginx</code></td><td>删除容器</td></tr></tbody></table><h3 id="_6-nginx的反向代理配置" tabindex="-1">6. nginx的反向代理配置 <a class="header-anchor" href="#_6-nginx的反向代理配置" aria-label="Permalink to &quot;6. nginx的反向代理配置&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1.如果是那个前端内网到---后端内网，只需要直连就行了</span></span>
<span class="line"><span>2.如果是前端外网到---后端外网，需要走代理</span></span>
<span class="line"><span>代理的话看是不是路由器统一转发的，如果是统一转发的，需要加上前缀，再去掉前缀，然后实现前端外网地址代理前端内网地址，后端外网地址代理后端内网，然后去掉前缀，使用路由器统一转发的ip地址端口访ip地址端口</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_7-网络连通性检查" tabindex="-1">7.网络连通性检查 <a class="header-anchor" href="#_7-网络连通性检查" aria-label="Permalink to &quot;7.网络连通性检查&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 检查网络连通性</span></span>
<span class="line"><span>ping 192.168.0.136</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查端口是否开放</span></span>
<span class="line"><span>telnet 192.168.0.136 3000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 或者使用curl测试</span></span>
<span class="line"><span>curl http://192.168.0.136:3000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_8-如何把服务器文件下载本地" tabindex="-1">8.如何把服务器文件下载本地 <a class="header-anchor" href="#_8-如何把服务器文件下载本地" aria-label="Permalink to &quot;8.如何把服务器文件下载本地&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你可以通过以下几种方式将服务器上的文件下载到本地：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 1. 使用 SCP 命令（推荐）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span># 从本地终端执行（不是在服务器上执行）</span></span>
<span class="line"><span>scp root@你的服务器IP:/root/docker/文件名 本地保存路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>scp root@123.45.67.89:/root/docker/dist.zip ~/Downloads/</span></span>
<span class="line"><span>scp root@123.45.67.89:/root/docker/docker-20.10.6.tgz ./Desktop/</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 2. 使用 SFTP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span># 连接到服务器</span></span>
<span class="line"><span>sftp root@你的服务器IP</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进入文件所在目录</span></span>
<span class="line"><span>cd /root/docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 下载文件</span></span>
<span class="line"><span>get dist.zip</span></span>
<span class="line"><span>get docker-20.10.6.tgz</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 或者下载整个目录</span></span>
<span class="line"><span>get -r nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 退出</span></span>
<span class="line"><span>exit</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 3. 使用 rz/sz 命令（如果已安装）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在服务器上执行：</span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span># 进入文件目录</span></span>
<span class="line"><span>cd /root/docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 下载单个文件</span></span>
<span class="line"><span>sz dist.zip</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 下载多个文件</span></span>
<span class="line"><span>sz dist.zip docker-20.10.6.tgz</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 4. 使用 FTP 客户端</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用 FileZilla、WinSCP 等工具：</span></span>
<span class="line"><span>- 主机：你的服务器IP</span></span>
<span class="line"><span>- 用户名：root</span></span>
<span class="line"><span>- 密码：你的服务器密码</span></span>
<span class="line"><span>- 端口：22 (SFTP) 或 21 (FTP)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 5. 使用 wget/curl（如果文件可通过web访问）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果文件可以通过web访问，可以在本地使用：</span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>wget http://你的服务器IP/文件路径</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 注意事项：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **替换IP地址**：将命令中的&quot;你的服务器IP&quot;替换为实际服务器IP</span></span>
<span class="line"><span>2. **文件路径**：确保使用正确的文件路径</span></span>
<span class="line"><span>3. **权限**：确保有下载文件的权限</span></span>
<span class="line"><span>4. **网络**：确保本地与服务器网络连通</span></span>
<span class="line"><span></span></span>
<span class="line"><span>推荐使用 **SCP** 方法，它简单直接且安全。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br></div></div><p>安装包安装</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 下载二进制版本</span></span>
<span class="line"><span># nginx.org/download/nginx-1.24.0.tar.gz</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>一键安装脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>echo &quot;=== Nginx 最终安装脚本 ===&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 清理环境</span></span>
<span class="line"><span>pkill nginx 2&gt;/dev/null</span></span>
<span class="line"><span>systemctl stop nginx 2&gt;/dev/null</span></span>
<span class="line"><span>rm -f /etc/systemd/system/nginx.service</span></span>
<span class="line"><span>rm -rf /etc/nginx</span></span>
<span class="line"><span>rm -rf /var/log/nginx</span></span>
<span class="line"><span>rm -rf /var/cache/nginx</span></span>
<span class="line"><span>rm -f /usr/sbin/nginx</span></span>
<span class="line"><span>rm -rf /usr/local/nginx</span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 解压安装</span></span>
<span class="line"><span>cd /root</span></span>
<span class="line"><span>tar -zxvf nginx-1.24.0.tar.gz</span></span>
<span class="line"><span>cd nginx-1.24.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>./configure \\</span></span>
<span class="line"><span>--prefix=/usr/local/nginx \\</span></span>
<span class="line"><span>--sbin-path=/usr/sbin/nginx \\</span></span>
<span class="line"><span>--conf-path=/etc/nginx/nginx.conf \\</span></span>
<span class="line"><span>--error-log-path=/var/log/nginx/error.log \\</span></span>
<span class="line"><span>--http-log-path=/var/log/nginx/access.log \\</span></span>
<span class="line"><span>--pid-path=/var/run/nginx.pid</span></span>
<span class="line"><span></span></span>
<span class="line"><span>make &amp;&amp; make install</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建目录</span></span>
<span class="line"><span>mkdir -p /var/log/nginx /var/cache/nginx /etc/nginx/conf.d</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用 root 用户的服务文件</span></span>
<span class="line"><span>cat &gt; /etc/systemd/system/nginx.service &lt;&lt; &#39;SERVICE_EOF&#39;</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=The nginx HTTP and reverse proxy server</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=forking</span></span>
<span class="line"><span>PIDFile=/var/run/nginx.pid</span></span>
<span class="line"><span>ExecStartPre=/usr/sbin/nginx -t</span></span>
<span class="line"><span>ExecStart=/usr/sbin/nginx</span></span>
<span class="line"><span>ExecReload=/usr/sbin/nginx -s reload</span></span>
<span class="line"><span>ExecStop=/bin/kill -s QUIT $MAINPID</span></span>
<span class="line"><span>PrivateTmp=true</span></span>
<span class="line"><span>User=root</span></span>
<span class="line"><span>Group=root</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span>SERVICE_EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动</span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>nginx -t</span></span>
<span class="line"><span>systemctl start nginx</span></span>
<span class="line"><span>systemctl enable nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;=== 安装完成 ===&quot;</span></span>
<span class="line"><span>systemctl status nginx --no-pager</span></span>
<span class="line"><span>echo &quot;访问: http://服务器IP&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br></div></div><p>把自己的dist文件夹放到服务器上，然后修改Nginx代理的位置</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat &gt; /etc/nginx/nginx.conf &lt;&lt; &#39;EOF&#39;</span></span>
<span class="line"><span>user root;</span></span>
<span class="line"><span>worker_processes auto;</span></span>
<span class="line"><span>error_log /var/log/nginx/error.log;</span></span>
<span class="line"><span>pid /var/run/nginx.pid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections 1024;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    include /etc/nginx/mime.types;</span></span>
<span class="line"><span>    default_type application/octet-stream;</span></span>
<span class="line"><span>    access_log /var/log/nginx/access.log;</span></span>
<span class="line"><span>    sendfile on;</span></span>
<span class="line"><span>    keepalive_timeout 65;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 80;</span></span>
<span class="line"><span>        server_name _;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 设置网站根目录</span></span>
<span class="line"><span>        root /root/dist;</span></span>
<span class="line"><span>        index index.html index.htm;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 主要配置</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>清理Nginx的脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>echo &quot;=== 彻底清除 Nginx ===&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 颜色定义</span></span>
<span class="line"><span>RED=&#39;\\033[0;31m&#39;</span></span>
<span class="line"><span>GREEN=&#39;\\033[0;32m&#39;</span></span>
<span class="line"><span>YELLOW=&#39;\\033[1;33m&#39;</span></span>
<span class="line"><span>NC=&#39;\\033[0m&#39; # No Color</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log() { echo -e &quot;\${GREEN}[INFO]\${NC} $1&quot;; }</span></span>
<span class="line"><span>warn() { echo -e &quot;\${YELLOW}[WARN]\${NC} $1&quot;; }</span></span>
<span class="line"><span>error() { echo -e &quot;\${RED}[ERROR]\${NC} $1&quot;; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检查 root 权限</span></span>
<span class="line"><span>if [ $(id -u) -ne 0 ]; then</span></span>
<span class="line"><span>    error &quot;请使用 root 用户运行此脚本&quot;</span></span>
<span class="line"><span>    exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;此脚本将彻底删除 Nginx，包括：&quot;</span></span>
<span class="line"><span>echo &quot;✅ 停止所有 Nginx 进程&quot;</span></span>
<span class="line"><span>echo &quot;✅ 删除系统服务&quot;</span></span>
<span class="line"><span>echo &quot;✅ 删除二进制文件&quot;</span></span>
<span class="line"><span>echo &quot;✅ 删除配置文件&quot;</span></span>
<span class="line"><span>echo &quot;✅ 删除日志文件&quot;</span></span>
<span class="line"><span>echo &quot;✅ 删除用户数据&quot;</span></span>
<span class="line"><span>echo &quot;&quot;</span></span>
<span class="line"><span>read -p &quot;确定要继续吗？(y/N): &quot; confirm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [[ ! $confirm =~ ^[Yy]$ ]]; then</span></span>
<span class="line"><span>    echo &quot;操作已取消&quot;</span></span>
<span class="line"><span>    exit 0</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log &quot;开始彻底清除 Nginx...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 停止所有 Nginx 相关进程</span></span>
<span class="line"><span>log &quot;停止 Nginx 进程...&quot;</span></span>
<span class="line"><span>systemctl stop nginx 2&gt;/dev/null</span></span>
<span class="line"><span>pkill -9 nginx 2&gt;/dev/null</span></span>
<span class="line"><span>sleep 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 停止并禁用服务</span></span>
<span class="line"><span>systemctl disable nginx 2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 删除系统服务文件</span></span>
<span class="line"><span>log &quot;删除系统服务...&quot;</span></span>
<span class="line"><span>rm -f /etc/systemd/system/nginx.service</span></span>
<span class="line"><span>rm -f /usr/lib/systemd/system/nginx.service</span></span>
<span class="line"><span>rm -f /etc/init.d/nginx</span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl reset-failed nginx 2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 删除二进制文件</span></span>
<span class="line"><span>log &quot;删除二进制文件...&quot;</span></span>
<span class="line"><span>rm -f /usr/sbin/nginx</span></span>
<span class="line"><span>rm -f /usr/local/sbin/nginx</span></span>
<span class="line"><span>rm -f /usr/bin/nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查找并删除其他可能的 nginx 二进制文件</span></span>
<span class="line"><span>find /usr/local/bin /usr/bin /opt -name &quot;nginx&quot; -type f -delete 2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 删除安装目录</span></span>
<span class="line"><span>log &quot;删除安装目录...&quot;</span></span>
<span class="line"><span>rm -rf /usr/local/nginx</span></span>
<span class="line"><span>rm -rf /opt/nginx</span></span>
<span class="line"><span>rm -rf /etc/nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 5. 删除数据和日志</span></span>
<span class="line"><span>log &quot;删除数据和日志...&quot;</span></span>
<span class="line"><span>rm -rf /var/log/nginx</span></span>
<span class="line"><span>rm -rf /var/cache/nginx</span></span>
<span class="line"><span>rm -rf /var/lib/nginx</span></span>
<span class="line"><span>rm -rf /usr/share/nginx</span></span>
<span class="line"><span>rm -rf /var/www/html</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 6. 删除运行文件</span></span>
<span class="line"><span>log &quot;删除运行文件...&quot;</span></span>
<span class="line"><span>rm -f /var/run/nginx.pid</span></span>
<span class="line"><span>rm -f /var/run/nginx.lock</span></span>
<span class="line"><span>rm -rf /var/run/nginx</span></span>
<span class="line"><span>rm -f /run/nginx.pid</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 7. 删除源码目录</span></span>
<span class="line"><span>log &quot;删除源码目录...&quot;</span></span>
<span class="line"><span>rm -rf /root/nginx-*</span></span>
<span class="line"><span>rm -rf /tmp/nginx-*</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 8. 删除配置文件备份</span></span>
<span class="line"><span>log &quot;删除配置文件备份...&quot;</span></span>
<span class="line"><span>find /etc -name &quot;nginx.conf.*&quot; -delete 2&gt;/dev/null</span></span>
<span class="line"><span>find /root -name &quot;nginx.conf.*&quot; -delete 2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 9. 删除用户和组（可选）</span></span>
<span class="line"><span>read -p &quot;是否删除 nginx 用户和组？(y/N): &quot; delete_user</span></span>
<span class="line"><span>if [[ $delete_user =~ ^[Yy]$ ]]; then</span></span>
<span class="line"><span>    log &quot;删除 nginx 用户和组...&quot;</span></span>
<span class="line"><span>    userdel nginx 2&gt;/dev/null</span></span>
<span class="line"><span>    groupdel nginx 2&gt;/dev/null</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    warn &quot;保留 nginx 用户和组&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 10. 清理包管理器安装的 Nginx</span></span>
<span class="line"><span>log &quot;清理包管理器安装的 Nginx...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># CentOS/RHEL</span></span>
<span class="line"><span>if command -v rpm &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span>    rpm -qa | grep nginx | while read package; do</span></span>
<span class="line"><span>        warn &quot;发现 RPM 包: $package&quot;</span></span>
<span class="line"><span>        rpm -e --nodeps $package 2&gt;/dev/null &amp;&amp; log &quot;已删除: $package&quot; || error &quot;删除失败: $package&quot;</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Ubuntu/Debian</span></span>
<span class="line"><span>if command -v dpkg &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span>    dpkg -l | grep nginx | awk &#39;{print $2}&#39; | while read package; do</span></span>
<span class="line"><span>        warn &quot;发现 DEB 包: $package&quot;</span></span>
<span class="line"><span>        dpkg -P $package 2&gt;/dev/null &amp;&amp; log &quot;已删除: $package&quot; || error &quot;删除失败: $package&quot;</span></span>
<span class="line"><span>    done</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 11. 最终验证</span></span>
<span class="line"><span>log &quot;=== 清理完成验证 ===&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo -n &quot;Nginx 进程: &quot;</span></span>
<span class="line"><span>if pgrep nginx &gt;/dev/null; then</span></span>
<span class="line"><span>    error &quot;仍有 Nginx 进程运行&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo -e &quot;\${GREEN}无进程\${NC}&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo -n &quot;Nginx 命令: &quot;</span></span>
<span class="line"><span>if which nginx &gt;/dev/null 2&gt;&amp;1 || command -v nginx &gt;/dev/null 2&gt;&amp;1; then</span></span>
<span class="line"><span>    error &quot;Nginx 命令仍存在&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo -e &quot;\${GREEN}已删除\${NC}&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo -n &quot;配置文件: &quot;</span></span>
<span class="line"><span>if [ -d &quot;/etc/nginx&quot; ] || [ -f &quot;/etc/nginx/nginx.conf&quot; ]; then</span></span>
<span class="line"><span>    error &quot;配置文件仍存在&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo -e &quot;\${GREEN}已删除\${NC}&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo -n &quot;服务文件: &quot;</span></span>
<span class="line"><span>if [ -f &quot;/etc/systemd/system/nginx.service&quot; ] || [ -f &quot;/usr/lib/systemd/system/nginx.service&quot; ]; then</span></span>
<span class="line"><span>    error &quot;服务文件仍存在&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo -e &quot;\${GREEN}已删除\${NC}&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 12. 清理脚本自身</span></span>
<span class="line"><span>read -p &quot;是否删除此清理脚本？(y/N): &quot; delete_script</span></span>
<span class="line"><span>if [[ $delete_script =~ ^[Yy]$ ]]; then</span></span>
<span class="line"><span>    log &quot;删除清理脚本...&quot;</span></span>
<span class="line"><span>    rm -f &quot;$0&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log &quot;=== Nginx 彻底清除完成 ===&quot;</span></span>
<span class="line"><span>echo &quot;所有 Nginx 相关文件已被删除&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br></div></div>`,40)])])}const d=n(e,[["render",i]]);export{m as __pageData,d as default};
