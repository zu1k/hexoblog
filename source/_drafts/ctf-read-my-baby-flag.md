---
title: ctf中如何读取flag
tags:
  - ctf
  - flag
  - permission
categories:
  - ctf
date: 2020-03-29 14:21:04
---


## flag在哪里

当拿到权限后首先要找到flag在哪里，一般情况下有两种可能：

1. 在文件系统中某个文件里存着
2. 在数据库中

### 文件存储

使用shell查找包含`flag`关键字的文件

使用python遍历目录查找

使用php脚本遍历目录查找

