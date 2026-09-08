import{_ as e,c as a,o as r,al as s}from"./chunks/framework.QMC68jD7.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tech/前端工程化/本地部署x86测试.md","filePath":"tech/前端工程化/本地部署x86测试.md","lastUpdated":1777273084000}'),t={name:"tech/前端工程化/本地部署x86测试.md"};function p(o,n,i,c,d,l){return r(),a("div",null,[...n[0]||(n[0]=[s(`<p>服务器 ssh <a href="mailto:root@8.154.20.183" target="_blank" rel="noreferrer">root@8.154.20.183</a></p><p>1.在docker 文件夹打开终端 2.code nginx.conf 检查nginx代理 3.code docker.run.sh 检查运行的脚本文件 4.创建文件 touch config.js 并编辑config.js 5.docker load -i data_registry_web_ui_dev_0.0.1.tar 上传镜像 6.运行docker.run.sh (启动nginx) sh docker.run.sh 6.创建容器并运行 docker run --name data_registry --rm -p 21207:80 -v /Users/chenyoupeng/develop/docker/nginx-proxy/config.js:/app/dist/config.js 61.169.171.82:37080/public/61.169.171.82:37080/public/data_registry_web_ui_dev_x86:1.2.0 7.访问地址 <a href="http://127.0.0.1/data-registry/dataAssetCatalog" target="_blank" rel="noreferrer">http://127.0.0.1/data-registry/dataAssetCatalog</a> docker.run.sh 配置</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run --rm --name nginx_proxy \\</span></span>
<span class="line"><span>    -p 80:80 \\</span></span>
<span class="line"><span>    -v /Users/chenyoupeng/develop/docker/nginx-proxy/nginx.conf:/etc/nginx/nginx.conf:ro \\</span></span>
<span class="line"><span>    nginx_arm64:1.24.0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>本地</p><p>服务端 docker run -d --name nginx_proxy <br> -p 80:80 <br> -v /Users/chenyoupeng/develop/docker/nginx-proxy/nginx.conf:/etc/nginx/nginx.conf:ro <br> nginx_arm64:1.24.0</p><p>nginx.conf 配置（proxy_pass本地必须使用本机的ip地址）</p><p>worker_processes 2;</p><p>events { worker_connections 1024; }</p><p>http {</p><pre><code>include       mime.types;
default_type  application/octet-stream;

sendfile        on;
#tcp_nopush     on;

#keepalive_timeout  0;
keepalive_timeout  65;

client_max_body_size 10M;
#gzip  on;


# 网站代理配置
server {
    listen       80;
    listen       [::]:80;
    location ^~/data-registry {
        rewrite ^/data-registry/(.*)$ /$1 break;
        proxy_pass http://192.168.0.118:21207/;  
    }
}
</code></pre><p>}</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>`,12)])])}const u=e(t,[["render",p]]);export{g as __pageData,u as default};
