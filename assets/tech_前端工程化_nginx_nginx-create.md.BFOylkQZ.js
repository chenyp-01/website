import{_ as s,c as a,o as p,al as e}from"./chunks/framework.QMC68jD7.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tech/前端工程化/nginx/nginx-create.md","filePath":"tech/前端工程化/nginx/nginx-create.md","lastUpdated":1777273084000}'),l={name:"tech/前端工程化/nginx/nginx-create.md"};function r(i,n,c,b,t,m){return p(),a("div",null,[...n[0]||(n[0]=[e(`<p>创建nginx，脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
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
<span class="line"><span>echo &quot;访问: http://服务器IP&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br></div></div>`,2)])])}const g=s(l,[["render",r]]);export{o as __pageData,g as default};
