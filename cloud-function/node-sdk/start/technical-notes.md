# 云函数技术细节

## 权限

在云函数中执行的代码权限等级为超级管理员权限，不受数据表 ACL 的限制。
因此开发者可以在云函数中执行一些特权操作，比如：
- 批量修改用户信息
- 写入一张所有人不可写的数据表
- 删除数据表

## 函数运行时的容器模型

云函数系统接收到云函数任务时将会根据任务的配置信息（如内存大小等）进行资源分配，进行所有函数运行容器的创建、管理和删除清理操作。

分配完成后，云函数代码将在被分配的容器中执行，在第一次执行完以后，容器将保留一段时间，假如这段时间内有同一个函数的新任务被触发，那么新任务将会在同一个容器中被执行，这意味着同一个容器可能会被调度来执行多个云函数任务，这也起到了减少云函数任务执行延迟的作用。

此机制会有以下影响：

- 用户代码在[函数入口](/cloud-function/node-sdk/start/code-format.html#%E4%BB%A3%E7%A0%81%E6%A0%BC%E5%BC%8F)外定义的全局变量在复用的容器环境中将被保留，开发者可以在云函数中增加检查代码来确认是否已在全局变量中缓存一些可复用的数据，以减少一些重复的网络请求、数据查询或计算。

- 被复用的容器在 /tmp 目录下的文件将会被保留至下一个云函数任务中，开发者可以添加额外的代码来检查缓存中是否有存储的数据，以减少一些重复的网络请求。同时，如果任务产生的临时文件较大，为避免影响下次任务执行，可考虑主动删除清理文件。

> **info**
> 请勿在云函数代码中假定当前的容器是被复用的容器，容器是新容器或是被复用的容器与每一次调用时系统中的容器情况有关，如果要使用容器中缓存的信息，请务必在云函数代码中增加检查先确认容器中存在缓存。


## 任务调度策略

当前版本的云函数并发限制如下（如需提升并发额度，请[点击提交申请](https://jinshuju.net/f/oUGuT1)），即只能同时运行 100/10 个云函数任务：

| 配置   | 并发限制  |
|----------|---------|
| 128M/0.5CPU     | 100 |
| 256M/0.75CPU    | 10  |


若应用正在运行的云函数任务达到并发限制时接收到新任务，将会按照以下策略进行调度：

1. 同步云函数任务：
在 2 秒内会重试几次进行调度执行，如果每次调度时应用正在运行的云函数任务都已达限制，则调度失败，云函数任务不会被运行。

2. 异步云函数任务：
在 5 分钟内在重试几次进行调度执行，如果每次调度时应用正在运行的云函数任务都已达限制，则调度失败，云函数任务不会被运行。

## 网络并发请求限制

当前版本的云函数对于对容器外网络请求有并发限制（包括数据表 / 内容库等知晓云操作以及知晓云外的网络请求），当进行并发请求时（如使用 Promise.all），请将并发请求数控制在 50 个以下。

## 云函数内存限制

当前版本云函数提供 128M/256M 两个版本，如果你有更高级别的要求，请联系微信客服（minsupport3）

## 其他

{% include "/cloud-function/frag/cloud-function-technical-notes.md" %}
