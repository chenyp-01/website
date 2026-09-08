import{_ as t,c as n,o,al as p}from"./chunks/framework.QMC68jD7.js";const l=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tech/git/02-团队协作的流程.md","filePath":"tech/git/02-团队协作的流程.md","lastUpdated":1777271852000}'),i={name:"tech/git/02-团队协作的流程.md"};function r(s,e,a,c,d,_){return o(),n("div",null,[...e[0]||(e[0]=[p(`<p>一、 由leader在码云上创建一个空的git仓库</p><p>二、leader在自己的电脑上用git clone拉取仓库 （仓库中已经生成.git文件）</p><p>三、leader搭建项目目录，并放入公共的文件： （空文件夹中要创建.gitkeep,否则提交不了）</p><pre><code>css文件:  
    reset.css 
    swiper.css  
    common.css
    iconfont.css

js文件：  
    jquery.js  
    swiper.js  
    util.js  
    jquery.cookie.js 

fonts文件： 图标字体

img：  
    lazyload.gif
    loading.gif
    logo.png


网页文件： 
    index.html
    category.html
    ...
</code></pre><p>四、 leader先提交本地仓库： git add --&gt; git commit (要保证所有最新操作都commit)</p><p>五、 与远程仓库建立连接： git remote add origin https的仓库地址</p><pre><code> 如果不成功： 先删除远程 origin :   git remote rm origin , 再调用上面的命令
</code></pre><p>六、把本地仓库推送到远程 ： git push -u origin master</p><p>七、leader把成员拉入仓库中</p><p>八、团队成员拉取仓库： git clone https的仓库地址</p><pre><code>重复四----六的步骤
</code></pre><p>*****如果用户名和密码填错，则不会再弹出认证窗口。 *****重新显示认证窗口的办法： 控制面板--&gt; 凭据管理器--&gt;删除凭据即可</p><p>九、 每天早上从仓库上拉取最新的代码， 每天晚上向仓库推代码</p>`,13)])])}const m=t(i,[["render",r]]);export{l as __pageData,m as default};
