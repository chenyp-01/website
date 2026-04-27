1.配置初始化设置 输入指令 git init
2.隐藏文件显示git 
2.1 git config --list  查看是否登录
2.2 退出 shift 加q 
3.
 没有配置过就 绑定登录
git config --global user.name "输入你的用户名"
git
git config --global user.email "输入你的邮箱"
配置过修改登录
git config --global --replace-all user.name "输入你的用户名"
git config --global --replace-all user.email "输入你的邮箱"
--------------------
4.  一些单词  
config配置 init 初始化  branch分支 master主要的
commits提交    Untracked没有被跟踪 moudy 修改的
merge 合并  conflict 冲突  ipconfig
up-to-date 最新的

5.命令------------------------
cls清屏
cd进目录
cd..退目录
mkdir新文件名称  创建文件件
------------
git log  查看版本日志
git add 
目录 
git status 查看暂存区
 git commit -m '版本声明'    添加到版本库
.gitkeep  空文件夹 需要被跟踪
git reset 文件名 暂存区回撤 
 git reset -- hard     回滚版本
git reflog 回滚之后查看以前的历史版本日志
单个文件的版本回退  git checked 版本号 加文件名
---------------------------
clast  *   443
6 绑定远程仓库并把代码进行送-------------------
 1.绑定远程仓库
 git remote add origin 你的仓库地址 
2.把本地仓库内容推送到远程
 git push -u origin master
7.添加小组成员拉进去
8.下载远程仓库的代码
打开cmd 
输入命令git clone 远程仓库地址
--------------------
-----------获取最近的数据是
 git pull --rebase origin master
-------------解除绑定远程仓库地址是
     git pull --rebase origin master   更新
  git remote rm origin      解绑
  git remote add origin 你的仓库地址   绑定
  git push -u origin master   推送

----------创建分支  切换分支   删除分支-----------
查看所有分支git branch 
创建新的分支 git branch  分支名称
切换其他分支 git checkout 分支名字 
合并分支 git merge 分支名称
创建远程分支 git push --set--upstrarm origin login




--------------
第二次将一个新的项目在提交到仓库
此时，我们继续按照上面的步骤提交项目，第五步的时候就会出现一个错误！！
出现错误的主要原因是gitee中的README.md文件不在本地代码目录中
此时我们要执行git pull --rebase origin master命令将README.md拉到本地，
我们要执行
git pull --rebase origin master
命令将README.md拉到本地，
git push origin master
-----------------------
报错
1.error: cannot pull with rebase: You have unstaged changes.
error: please commit or stash them.
这是因为本地有更改没有提交。
2.
如果需要提交，就git add ,git commit,提交上去；
本地文件需要和远程文件保持一致才能推上去
3.再执行：git pull --rebase origin master，即可获取更新。
4.git push -u origin master
换绑库 
1、先输入git remote rm origin 删除关联的origin的远程库
