import{_ as n,c as a,o as p,al as e}from"./chunks/framework.QMC68jD7.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tech/前端工程化/nginx/trzsz.md","filePath":"tech/前端工程化/nginx/trzsz.md","lastUpdated":1777273084000}'),l={name:"tech/前端工程化/nginx/trzsz.md"};function i(t,s,r,c,o,b){return p(),a("div",null,[...s[0]||(s[0]=[e(`<p>安装脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>set -e</span></span>
<span class="line"><span>echo &quot;1️⃣ 更新 apt 并安装依赖...&quot;</span></span>
<span class="line"><span>sudo apt update</span></span>
<span class="line"><span>sudo apt install -y python3-pip python3-venv pipx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;2️⃣ 确保 pipx 路径在 PATH...&quot;</span></span>
<span class="line"><span># 添加到当前终端</span></span>
<span class="line"><span>export PATH=&quot;$HOME/.local/bin:$PATH&quot;</span></span>
<span class="line"><span># 添加到 ~/.bashrc 永久生效</span></span>
<span class="line"><span>grep -qxF &#39;export PATH=&quot;$HOME/.local/bin:$PATH&quot;&#39; ~/.bashrc || echo &#39;export PATH=&quot;$HOME/.local/bin:$PATH&quot;&#39; &gt;&gt; ~/.bashrc</span></span>
<span class="line"><span>. ~/.bashrc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;3️⃣ 安装 trzsz（包含依赖，提供 trz/tsz 命令）...&quot;</span></span>
<span class="line"><span>pipx install --include-deps trzsz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;4️⃣ 验证安装...&quot;</span></span>
<span class="line"><span>if command -v trz &gt;/dev/null &amp;&amp; command -v tsz &gt;/dev/null; then</span></span>
<span class="line"><span>    echo &quot;✅ trz/tsz 安装成功！&quot;</span></span>
<span class="line"><span>    trz --version</span></span>
<span class="line"><span>    tsz --version</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo &quot;❌ 安装失败，请检查日志。&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;安装完成！你现在可以直接在服务器用 &#39;trz&#39; 上传文件，&#39;tsz&#39; 下载文件。&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>卸载脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pipx uninstall trzsz</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt uninstall -y python3-pip python3-venv pipx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,5)])])}const m=n(l,[["render",i]]);export{d as __pageData,m as default};
