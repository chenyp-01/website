---
layoutClass: m-nav-layout
---

# charles抓包工具的作用

Charles是一个用于抓包的好工具，Charles抓包是通过中间人代理实现，在客户端和服务端通信时，Charles会截取客户端发送给服务端的请求，然后伪装成客户端与服务端进行通信，服务端返回数据时，Charles会截取数据伪装成服务端将数据发送给客户端。

- 参考：手把手教你如何使用Charles抓包

https://blog.csdn.net/caixiangting/article/details/125646494

# 下载安装

下载地址： https://www.charlesproxy.com/

# charles配置

如果需要抓取https协议的包，需要进行配置

1. 点击顶部菜单栏【Help】–>选择【SSL Proxying】，点击【install Charles Root Certificate 】安装Charles根证书即可

![img](https://img-blog.csdnimg.cn/img_convert/c5eacb0cb7041d8dbb8479ed87c4b015.png)

2. 单击“安装证书”，出现以下界面

（截图资源缺失，暂不展示）

3. 选择“本地计算机", 然后”下一页“

   （截图资源缺失，暂不展示）

4. 选择"将所有证书都放入下列存储"，并单击”浏览“, 在弹出窗口中选择”受信任的根证书颁发机构",并确定，然后单击“下一步”

（截图资源缺失，暂不展示）

5.  在下方窗口中单击“完成”
    （截图资源缺失，暂不展示）

6.  显示导入成功

    （截图资源缺失，暂不展示）

7.  关闭charles后重启，再执行第一步的指令，显示下图,说明证书安装成功, 单击“确定”关闭即可

    （截图资源缺失，暂不展示）

# 使用charles获取数据

1. 打开charles

2. 用浏览器访问网页

3. 在charles中会显示访问的域名列表

4. 选择要抓包的域名，在右侧切换到"Summary", 查看"Mime Type"为 "application/json" 即响应数据为json

   （截图资源缺失，暂不展示）

5. 双击summary中某一项

6. （截图资源缺失，暂不展示）
