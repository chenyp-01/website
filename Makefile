# ========================
# make release
# 服务器配置
SERVER_USER = root
SERVER_HOST = 1.94.19.39
SERVER_PATH = /root/app/static
REMOTE_DIR = myblob
APP_BASE_PATH ?= /$(REMOTE_DIR)
PNPM ?= pnpm

REMOTE_TARGET = $(SERVER_USER)@$(SERVER_HOST):$(SERVER_PATH)/$(REMOTE_DIR)/

.PHONY: release build preview ssh-push

# ========================
# 发布流程
# ========================
release: build ssh-push
	
# 本地构建
build:
	APP_BASE_PATH=$(APP_BASE_PATH) $(PNPM) run build

# 本地预览构建结果
preview:
	$(PNPM) run preview

# 上传并替换服务器目录
ssh-push: build
	ssh $(SERVER_USER)@$(SERVER_HOST) 'mkdir -p $(SERVER_PATH)/$(REMOTE_DIR)'
	rsync -az --delete dist/ $(REMOTE_TARGET)

