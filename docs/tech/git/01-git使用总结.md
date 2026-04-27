=========================================本地仓库的操作

一、 创建版本库   ： git init

     对本机的用户名和邮箱进行配置：
			查看配置  git config --list
  
			git config --global user.name "Your Name" 
			git config --global user.email "email@example.com"
			
二、理解概念：  工作区---> git add 文件名 （git add . 添加全部） --->暂存区---->git commit -m ""  ---->版本库 (生成版本号)


三、查看工作区和暂存区的状态：  git status


四、查看版本记录：  git log       |      git log --pretty=oneline    |    git reflog


五、版本回退  

   （1）整个版本回退:   git reset --hard 版本号

  
   （2） 单个文件的版本回退  git checkout 版本号 文件名或路径+文件名


六、你的删除，修改，添加，如果确定要保留在记录中，则一定要git commit


==========================================远程仓库的使用


一、无论是关联到github或码云，可以用https，也可以用ssh协议，但ssh必须进行密钥的配对
	
   （1）生成密钥

        ssh-keygen -t rsa -C "747094687@qq.com"

    (2) 在github进入个人中心：  SSH --> 添加密钥（把本机公钥的内容粘进去）


二、在github上新建仓库：  new repository , 可以复制仓库的git地址（ssh协议）


三、在本地克隆远程仓库：  git clone git地址


四、怎么把本地版本库推送到远程仓库：  

（1）git remote add origin git@github.com:eblen007/test.git
================================================
     
    BUG:  如果出现错误 ：  fatal: remote origin already exists.

          1、先输入$ git remote rm origin   

          2、再输入$ git remote add origin git@github.com:djqiang/gitdemo.git 就不会报错了！



（2） git push -u origin master
=================================================

    BUG:  

       (1) 检查一下最新的操作是否git commit,  如果提交后，再执行该命令


       （2）如果不是上面的原因，而git push不成功，可先git pull origin master  或git pull origin master --allow-unrelated-histories  （如果进入编辑状态，则输入”:wq”回车退出）， 再执行上面的命令。



      （3）git push -u origin master 出现以下的报错

	$ git push -u origin master
	To github.com:wfteacher/yts0226.git
 	! [rejected]        master -> master (non-fast-forward)
	error: failed to push some refs to 'git@github.com:wfteacher/yts0226.git'
	hint: Updates were rejected because the tip of your current branch is behind
	hint: its remote counterpart. Integrate the remote changes (e.g.
	hint: 'git pull ...') before pushing again.
	hint: See the 'Note about fast-forwards' in 'git push --help' for details.
	
	解决方案： git push --force origin master   即可推送成功



      (4)git上传码云代码提示报错信息You do not have permission to push to the repository via HTTPS

	原因一  


由于是新本子新环境，很多都是自己后来重新搭建的，创建完一个空的项目之后根据提示有一个git的全局设置


git config --global user.name "your name"

git config --global user.email "your eamil"

处理完成之后，
通过

git push -u origin master
?

执行后，一开始以为是用户名密码错了，经过两次尝试，发现没有问题。

原因二


根据提示，意思大致是使用https协议没有权限，

于是采用了ssh，通过执行

git config --list

可以查看到当前项目关联的git地址，进入到项目根目录下的.git文件夹，有一个config的文件，

打开修改对应关联的地址为ssh形式的地址，然后在执行

git push -u origin master

发现成功了。



五、把远程仓库最新的版本拉取到本地

   git pull 

   （1）如果出现远程文件和本地文件的冲突，则需要解决冲突后，再进行git push

注意：  
 
（1）团队协作时，由一人创建远程库，

（2）其他成员在远程库的账号上注册SSH, （各自账号中的SSH删除），即可拉取，推送

（3）其他成员通过https地址来查看仓库













































