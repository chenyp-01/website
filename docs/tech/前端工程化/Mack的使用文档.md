#### 1.常见的Linux命令

| **命令**                   | **作用**                                       |
| -------------------------- | ---------------------------------------------- |
| `cd`                       | 进入目录                                       |
| `cd -`                     | 返回上一次的位置                               |
| `cd `                      | 返回根目录                                     |
| `pwd`                      | 显示当前所在目录                               |
| `ls`                       | 查看当前目录下的文件和文件夹                   |
| `touch test.txt`           | 创建 `test.txt` 文件                           |
| `mkdir myfolder`           | 创建 `myfolder` 文件夹                         |
| `rm test.txt`              | 删除 `test.txt` 文件                           |
| `rm -r myfolder`           | 递归删除 `myfolder` 文件夹（适用于非空文件夹） |
| `sudo rm -r deno-demo`     | 以管理员权限删除 `deno-demo` 目录              |
| `open test.txt`            | 用默认程序打开 `test.txt` 文件                 |
| `whereis node`             | 查找 `node` 可执行文件路径                     |
| `which node`               | 查找 `node` 命令所在路径                       |
| `npm config list`          | 查看 `npm` 代理配置                            |
| `history | grep docker`    | 结合 `grep` 查找特定命令                       |
| `chmod +x build-docker.sh` | 脚本赋予权限                                   |

#### 2.**常用 Markdown 编辑快捷键**

```
加粗：Command + B
斜体：Command + I
插入链接：Command + K
插入图片：Command + Shift + I
插入代码块：Command + Option + C
插入行内代码：Command + Option + K
撤销：Command + Z
重做：Command + Shift + Z
预览模式切换：Command + Shift + P
```

#### 3.npm设置代理

```
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

npm config delete proxy
npm config delete https-proxy
```

##### yarn设置代理

```
yarn config set proxy  http://127.0.0.1:7890
yarn config set https-proxy  http://127.0.0.1:7890

yarn config delete proxy
yarn config delete https-proxy
```

#### 4.Make 的使用技巧

1.创建一个Makefile的文件，然后编辑文件，然后运行

```
1. touch Makefile 
2. code Makefile 
run:
	say "Hello"
3. make run  
```

#### 5.浏览器操作

```
Command (⌘) + T → 新建标签页
Command (⌘) + W → 关闭当前标签页
Command (⌘) + Shift + T → 重新打开最近关闭的标签页
Command (⌘) + L → 快速定位到地址栏
Command (⌘) + R → 刷新页面
Command (⌘) + Shift + N → 打开无痕浏览模式
```

#### **6.终端快捷键**

```
1. **Control + A** → 跳到行首
2. **Control + E** → 跳到行尾
3. **Control + U** → 删除光标前的所有字符
4. **Control + K** → 删除光标后的所有字符
5. **Control + L** → 清屏（类似 `clear` 命令）
```

#### 7.Mac软件安装（brew）

```
command + 空格  搜索终端命令输入  
安装一个brew  /bin/bash -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
brew install tree 
brew uninstall  tree
brew list 差看安装的包
```

#### 8.windows拉去github代码

```
set https_proxy=http://127.0.0.1:7890&&git clone https://github.com/chenyp-01/cyp.git
```

Mac 有许多实用的快捷键，以下是常见的分类和快捷键：

------

###  mac通用快捷键

| 快捷键                           | 功能                      |
| :------------------------------- | ------------------------- |
| `Command (⌘) + C`                | 复制                      |
| `Command (⌘) + X`                | 剪切                      |
| `Command (⌘) + V`                | 粘贴                      |
| `Command (⌘) + Z`                | 撤销                      |
| `Command (⌘) + Shift (⇧) + Z`    | 重做                      |
| `Command (⌘) + A`                | 全选                      |
| `Command (⌘) + S`                | 保存                      |
| `Command (⌘) + P`                | 打印                      |
| `Command (⌘) + Option + C`       | 复制文件路径              |
| `command (⌘) + Shift (⇧) + .   ` | 隐藏文件显示              |
| `command (⌘)  + 空格  `          | 打开条件搜索              |
| `command (⌘)  + control + Q   `  | 锁屏                      |
| ` command (⌘) +  T   `           | 关闭窗口                  |
| `Command (⌘) + Shift (⇧) + 3`    | 截全屏                    |
| `Command (⌘) + Shift (⇧) + 4`    | 截区域                    |
| `Command (⌘) + Shift (⇧) + 5`    | 打开截图工具（可录屏）    |
| `Command (⌘) + Shift + Delete`   | 清空废纸篓                |
| `Command (⌘) + Option + v`       | 移动文件  配合Command + c |

------

### 屏幕与窗口管理

| 快捷键                           | 功能                     |
| -------------------------------- | ------------------------ |
| `Control (⌃) + Command (⌘) + F`  | 全屏模式（部分应用适用） |
| `Command (⌘) + Option (⌥) + D`   | 显示/隐藏 Dock           |
| `Command (⌘) + ↑`                | 滚动到页面顶部           |
| `Command (⌘) + ↓`                | 滚动到页面底部           |
| `Command (⌘) + W`                | 关闭当前窗口或标签       |
| `Command (⌘) + Q`                | 退出应用                 |
| `Command (⌘) + Option (⌥) + Esc` | 强制退出应用             |
| `Command (⌘) + Tab`              | 快速切换应用             |
| `Command (⌘) + H`                | 隐藏当前窗口             |
| `Command (⌘) + M`                | 最小化窗口               |

------

### 浏览器快捷键（Safari/Chrome）

| 快捷键                                 | 功能                 |
| -------------------------------------- | -------------------- |
| `Command (⌘) + T`                      | 新建标签页           |
| `Command (⌘) + Shift (⇧) + T`          | 恢复刚关闭的标签页   |
| `Command (⌘) + L`                      | 选中地址栏           |
| `Command (⌘) + D`                      | 添加书签             |
| `Command (⌘) + Option (⌥) + 左/右箭头` | 切换标签页           |
| `Command (⌘) + 数字 (1-9)`             | 快速切换到指定标签页 |
| `Command (⌘) + Shift + R`              | 浏览器刷新           |

------

###  Finder 文件管理

| 快捷键                              | 功能                     |
| ----------------------------------- | ------------------------ |
| `Command (⌘) + N`                   | 新建 Finder 窗口         |
| `Command (⌘) + Shift (⇧) + N`       | 新建文件夹               |
| `Command (⌘) + Delete`              | 删除文件（移动到废纸篓） |
| `Command (⌘) + Shift (⇧) + Delete`  | 清空废纸篓               |
| `Command (⌘) + Option (⌥) + Delete` | 直接删除（不经过废纸篓） |
| `Command (⌘) + I`                   | 查看文件信息             |
| `Command (⌘) + Shift (⇧) + G`       | 打开“前往文件夹”         |

------

###  终端快捷键

| 快捷键            | 功能                   |
| ----------------- | ---------------------- |
| `Control (⌃) + A` | 移动到行首             |
| `Control (⌃) + E` | 移动到行尾             |
| `Control (⌃) + U` | 清除当前行             |
| `Control (⌃) + K` | 删除光标后的内容       |
| `Control (⌃) + L` | 清屏（相当于 `clear`） |
| `Control (⌃) + C` | 终止当前进程           |
| `Control (⌃) + D` | 退出终端               |

------

### 特殊快捷键

| 快捷键                           | 功能              |
| -------------------------------- | ----------------- |
| `Option (⌥) + Shift (⇧) + K`     | 输入 Apple  标志 |
| `Command (⌘) + Option (⌥) + Esc` | 强制退出应用      |
| `Command (⌘) + Shift (⇧) + .`    | 显示/隐藏隐藏文件 |

------

