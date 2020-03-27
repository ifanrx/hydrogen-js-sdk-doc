# 用户

知晓云内置了用户管理系统，通过 SDK 封装的多种注册登录方法，可以便捷的创建用户，在用户模块，更可以对所有用户进行管理。

## 相关概念

使用用户服务前，你需要了解以下概念。

临时匿名用户：往数据表里添加数据，需要有一个用户身份（这样才能保障数据来源可回溯）。如果不希望强制用户在一开始就进行注册，可以使用匿名用户。

## 基础操作

### 查询用户

![查询用户](/images/dashboard/basic-services/user-list.png)

![高级查询](/images/dashboard/basic-services/search-user.png)

使用高级查询功能，可以筛选出特定平台来源或者在某个数据表有相应记录的用户。

### 设置用户分组

![设置用户分组](/images/dashboard/basic-services/set-up-user-group.png)

开发者可以批量选中用户并为其分配一个或多个分组。

### 添加分组

![添加分组](/images/dashboard/basic-services/add-user-group.png)

用户分组可以帮助开发者实现更加精细化的权限控制。如需编辑或删除分组，点击分组列表对应操作按钮即可。`删除分组并不会删除该分组下的用户。`

### 发送模板消息

![发送模板消息](/images/dashboard/basic-services/send-template-message.png)

当开发者筛选出的用户为单一小程序平台时，可点击用户列表上的「发送模板消息」按钮，即可快速为该批用户批量发送模板消息。此操作会跳转至「知晓推送」在线发送页面，默认收件人为之前筛选过的用户。