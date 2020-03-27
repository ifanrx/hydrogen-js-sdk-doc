# 注册登录

 `Auth` 集合了和平台无关的用户注册登录相关操作。

## 注册

开发者可以使用 `Auth` 来进行用户的通用注册。

> **info**
> 注册成功后会自动登录，调用注册方法之前需先前往[设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/)打开该登录方法


### 通过邮箱注册

> **info**
> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com 

**示例代码**

```java
Auth.signUpByEmail(name, pwd);
```

**异常**

操作失败抛出异常，异常请参考[异常](./error-code.md)

### 邮箱验证

请参考 [邮箱验证小节](./account.md)

### 通过用户名注册

> **info**
> 用户名不区分大小写。当用户注册了 username 为 ifanrx 的账号后，其他人不能再注册诸如 Ifanrx、IfAnrx、IFANRX 等账号了

**示例代码**

```java
Auth.signUpByUsername(username, pwd);
```

异常请参考[异常](./error-code.md)

## 登录

> **info**
> 调用登录方法之前需先前往[设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/)打开该登录方法

### 用户名登录

用户可以通过用户名和密码登录

**示例代码**

```java
Auth.signInByUsername(username, pwd);
```

### 邮箱登录

用户可以通过邮箱和密码登录

**示例代码**

```java
Auth.signInByEmail(email, pwd)
```

### 创建临时匿名用户

往数据表里添加数据，需要有一个用户身份（这样才能保障数据来源可回溯）。
如果不希望强制用户在一开始就进行注册，可以使用匿名用户，让应用不提供注册步骤也能创建临时用户。
以使得当前用户可以往 ACL 权限设置为“允许所有人（匿名用户 + 登录用户）可写” 的数据表内添加数据。

> 匿名登录使用场景举例：假如开发者希望应用内的文章，所有人可以在登录前阅读、点赞，
> 而且仅在调用特定接口时才需要登录，比如发布文章、评论文章。这时可以先使用匿名登录，
> 之后再使用其他登录方式登录（这里可能需要进行合并用户数据操作）。

匿名用户转换为正式用户（匿名登录后再使用其他登录方式登录），开发者需要考虑以下情况（以微信为例）：

1. 不需要进行用户数据合并

    匿名登录后，调用 `Auth.signUpByXXX(...)`，注册返回的 user_id 与之前匿名登录的 user_id 是一致的
    （也就是直接把匿名用户转变为了正式用户），所以不需要数据合并。

2. 需要进行用户数据合并

    匿名登录后，调用 `Auth.signInByXXX(...)`，登录成功后，返回的 user_id 必定与之前匿名登录的 user_id 不一致，所以需要数据合并。

> **info**
> 最终进不进行数据合并，由开发者自己考量决定。合并操作需要开发者自己进行。

**示例代码**

```java
Auth.signInAnonymous();
```

## 登出

清理客户端存储的用户授权信息。

通过 `Auth.logout()` 函数完成登出功能。

**请求示例**

```java
Auth.logout();
```

## 判断当前用户是否登录

```java
Auth.signedIn();
```

## 获取 currentUser 对象

请参考 [获取 currentUser 对象小节](./account.md)
