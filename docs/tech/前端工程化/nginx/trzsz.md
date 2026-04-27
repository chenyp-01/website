安装脚本

```
#!/bin/bash
set -e
echo "1️⃣ 更新 apt 并安装依赖..."
sudo apt update
sudo apt install -y python3-pip python3-venv pipx

echo "2️⃣ 确保 pipx 路径在 PATH..."
# 添加到当前终端
export PATH="$HOME/.local/bin:$PATH"
# 添加到 ~/.bashrc 永久生效
grep -qxF 'export PATH="$HOME/.local/bin:$PATH"' ~/.bashrc || echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
. ~/.bashrc

echo "3️⃣ 安装 trzsz（包含依赖，提供 trz/tsz 命令）..."
pipx install --include-deps trzsz

echo "4️⃣ 验证安装..."
if command -v trz >/dev/null && command -v tsz >/dev/null; then
    echo "✅ trz/tsz 安装成功！"
    trz --version
    tsz --version
else
    echo "❌ 安装失败，请检查日志。"
fi

echo "安装完成！你现在可以直接在服务器用 'trz' 上传文件，'tsz' 下载文件。"
```

卸载脚本

```
pipx uninstall trzsz
```

```
sudo apt uninstall -y python3-pip python3-venv pipx
```

