# 用户操作

## 获取用户列表

**接口**

~~`GET https://cloud.minapp.com/oserve/v1/miniapp/user-profile/`~~(后续将废弃该接口，推荐使用以下接口)

`GET https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/`

**参数说明**

> **info**
> 以下参数仅支持在 v1 版本接口中使用

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| created_at | String | N   | 用户创建的时间，值为时间戳。查询创建时间大于等于 2017-01-01 的用户 `created_at__gte=1483228800`，查询创建时间小于等于 2017-01-01 的用户：`created_at__lte=1483228800` |
| gender     | Number | N   | 用户的性别，其中 `1` 表示男，`2` 表示女 |
| group      | String | N   | 给定用户组 ID，查询在用户组下的用户列表。只支持 `in` 查询：`group__in=258,360`|
| limit      | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| nickname   | String | N   | 用户的微信昵称，支持等值查询 `nickname=Tom`, 模糊查询 `nickname__contains=Tom` |
| offset     | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| openid     | String | N   | 用户的 OpenID |
| order_by   | String | N   | 排序（支持 `created_at` 进行排序） |
| unionid    | String | N   | 用户的 UnionID |
| user_id    | String | N   | 用户 ID (对应 _userprofile 表中的 id 字段) |

> **info**
> 以下参数支持在 v2.1 版本接口中使用

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再进行 URL 编码 |
| group    | String | N   | 给定用户组 ID，查询在用户组下的用户列表。只支持 `in` 查询：`group__in=258,360`|
| order_by | String | N   | 以下字段不支持排序：`gender, country, province, city, language, write_perm, read_perm, _username, _email, _password, _email_verified, _provider, _anonymous`|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

> **info**
> where 字段的详细说明请查看：[数据模块：数据操作](https://doc.minapp.com/open-api/data/record.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE)。

**代码示例**

{% tabs first="Curl", second="Node", third="PHP" %}

{% content "first" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
--data-urlencode 'where={"test": {"$eq": "test"}}' \
https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/
```

{% content "second" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({"test": {"$eq": "test"}})
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "third"%}

```php
<?php
$url = "https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/?";
$condition = array(
  'where' => json_encode(['test' => ['$eq' => 'test']]),
);
$url .= http_build_query($condition);

$ch = curl_init();
$header = array(
  'Authorization: Bearer {$token}',
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res = curl_exec($ch);
curl_close($ch);
```
{% endtabs %}

**返回示例**

```json
{
    "meta": {
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 2
    },
    "objects": [
        {
            "avatar": "https://media.ifanrusercontent.com/tavatar/73/b2/73b23fbd584699bb31a0317c9d4425dcba9xxxx.jpg",
            "city": "广州",
            "country": "中国",
            "created_at": 1542364387,
            "created_by": 64501217,
            "gender": 1,
            "id": 64501217,
            "is_authorized": true,
            "language": "zh_CN",
            "nickname": "你今天真好看",
            "openid": "o0b495YcphSE24RbTl7K9dMx_QAA",
            "province": "广东",
            "test": "test",
            "unionid": null,
            "updated_at": 1542872767
        },
        {
            "avatar": "https://media.ifanrusercontent.com/tavatar/4d/7c/4d7c5418b262bfa2250fd3b70789ba9d0c6e4603.jpg",
            "city": "广州",
            "country": "中国",
            "created_at": 1542858732,
            "created_by": 70695404,
            "gender": 0,
            "id": 70695404,
            "is_authorized": true,
            "language": "zh_CN",
            "nickname": "你也是",
            "openid": "o0b495agcnGojMQbCnlB9AV6OeDw",
            "province": "广东",
            "test": "test",
            "unionid": null,
            "updated_at": 1542958030
        }
    ]
}
```

**状态码说明**

`200`: 成功。

`400`: where 中的操作符或值错误；排序字段不支持。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。


## 获取用户详情

**接口**

~~`GET https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?user_id={{ user_id }}`~~(后续将废弃该接口，推荐使用以下接口)

`GET https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/:id/`

其中 `:id` 是用户在 `_userprofile` 表中的 `id`。

**代码示例**

{% tabs  curl="Curl", node="Node", php="PHP" %}

{% content "curl"%}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/55019/
```

{% content "node" %}

```js
var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/55019/',   // 55019 对应 :id
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "php"%}

```php
<?php
$user_id = '55019'; // 用户 ID
$url = "https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/{$user_id}/";

$ch = curl_init();
$header = array(
  'Authorization: Bearer {$token}',
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res = curl_exec($ch);
curl_close($ch);

```

{% endtabs %}

**返回示例**

```json
{
  "avatar": "https://media.ifanrusercontent.com/media/tavatar/55/c3/55c3dbebcc61891be10d29ded808c84a01dxxxxx.jpg",
  "city": "Guangzhou",
  "country": "China",
  "created_at": 1504504504,
  "gender": 1,
  "id": 55019,
  "nickname": "PCG",
  "openid": "onzns0KsLKFyg3-VcW0GwTE6xxxx",
  "unionid": "onzns0KsLKFyg3-VcW0GwTE6xxxx",
  "province": "Guangdong",
  "user_group": [
      137
  ]
}
```

**状态码说明**

`200`: 成功。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 用户不存在。


### 更新单个用户信息

**接口**

~~`PUT https://cloud.minapp.com/oserve/v1/user/info/:id/`~~(后续将废弃该接口，推荐使用以下接口)

`PUT https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/:id/`

其中 `:id` 是用户在 `_userprofile` 表中的 `id`。

> **info**
> v2.1 版本接口允许修改部分内置字段，可修改的字段如下：`nickname, gender, country, province, city, language, avatar`。

**代码示例**

{% tabs  updateSingleUserInfoCurl="Curl", updateSingleUserInfoNode="Node", updateSingleUserInfoPHP="PHP" %}

{% content "updateSingleUserInfoCurl"%}

```shell
curl -X PUT \
  https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/70695404/ \
  -H "Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2" \
  -H "Content-Type: application/json" \
  -d '{"test": "test"}'
```

{% content "updateSingleUserInfoNode" %}

```javascript
var request = require("request");

var options = {
  method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/70695404/',
  headers:
  {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  body: { "test": "test" },
  json: true
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "updateSingleUserInfoPHP"%}

```php
<?php
$token = '35919068aa799eccdef19160e1da4bf21381d2a2';
$url = "https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/70695404/";

$ch = curl_init();
$header = array(
  'Authorization: Bearer {$token}',
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"test\": \"test\"}");

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
    "avatar": "https://media.ifanrusercontent.com/tavatar/4d/7c/4d7c5418b262bfa2250fd3b70789ba9d0c6e4603.jpg",
    "city": "广州",
    "country": "中国",
    "created_at": 1542858732,
    "created_by": 70695404,
    "gender": 1,
    "id": 70695404,
    "is_authorized": true,
    "language": "zh_CN",
    "nickname": "Guoch",
    "openid": "o0b495agcnGojMQbCnlB9AV6OeDw",
    "province": "广东",
    "test": "test",
    "unionid": null,
    "updated_at": 1542957870
}
```

**状态码说明**

`200`: 成功。

`400`: 字段类型不匹配；更新不允许修改的内置字段或不存在的字段。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 用户不存在。

### 批量修改自定义字段

`PUT https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/`

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| limit    | Number | N   | 限制单次请求更新的用户数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置更新的偏移值，默认为 0 |

> **info**
> where 字段的详细说明请查看：[数据模块：数据操作](https://doc.minapp.com/open-api/data/record.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE)。

**参数说明**

> **info**
> 参数与更新数据表数据的参数一致，详细说明请查看：[数据模块：更新数据](https://doc.minapp.com/open-api/data/record.html#%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE)。
> 支持数据原子性更新，详细说明请查看：[数据模块：数据原子性更新](https://doc.minapp.com/open-api/data/record.html#%E6%95%B0%E6%8D%AE%E5%8E%9F%E5%AD%90%E6%80%A7%E6%9B%B4%E6%96%B0)。

**代码示例**

{% tabs  bulkUpdateUserInfoCurl="Curl", bulkUpdateUserInfoNode="Node", bulkUpdateUserInfoPHP="PHP" %}

{% content "bulkUpdateUserInfoCurl"%}

```shell
curl -X PUT \
  https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/ \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
  -H 'Content-Type: application/json' \
  -d '{"test": "test"}'
```

{% content "bulkUpdateUserInfoNode" %}

```javascript
var request = require("request");

var options = {
  method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  body: { "test": "test" },
  json: true
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "bulkUpdateUserInfoPHP"%}

```php
<?php
$token = '35919068aa799eccdef19160e1da4bf21381d2a2';
$url = "https://cloud.minapp.com/oserve/v2.1/miniapp/user_profile/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"test\": \"test\"}");

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "operation_result": [
    {
      "success": {
        "id": "5a3c51cdceb616ccfc9d5f78",
        "updated_at": 1564411939
      }
    }
  ],
  "succeed": 1,
  "total_count": 1,
  "offset": 0,
  "limit": 1000,
  "next": null
}
```

> **info**
> 返回参数的详细说明请查看：[数据模块：同步批量修改数据](https://doc.minapp.com/open-api/data/record.html#%E5%90%8C%E6%AD%A5%E6%89%B9%E9%87%8F%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE)。

**状态码说明**

`200`: 成功。

`400`: 字段类型不匹配，更新非自定义字段或不存在的字段。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

### 修改用户登录信息

**接口**

`PUT https://cloud.minapp.com/oserve/v2.1/miniapp/user/account/:id/`

其中 `:id` 是用户在 `_userprofile` 表中的 `id`。

**参数说明**

Content-Type: `application/json`

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| username   | String | N   | 用户名，不区分大小写 |
| email | String | N   | 邮箱，不区分大小写 |
| password | String | N | 用户密码 |

**代码示例**

{% tabs updateSingleUserAccountInfoCurl="Curl", updateSingleUserAccountInfoNode="Node", updateSingleUserAccountInfoPHP="PHP" %}

{% content "updateSingleUserAccountInfoCurl"%}

```shell
curl -X PUT \
  https://cloud.minapp.com/oserve/v2.1/miniapp/user/account/70695404/ \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
  -H 'Content-Type: application/json' \
  -d '{"username": "pretty_girl"}'
```

{% content "updateSingleUserAccountInfoNode" %}

```javascript
var request = require("request");

var options = {
  method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v2.1/miniapp/user/account/70695404/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  body: { 'username': 'pretty_girl' },
  json: true
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "updateSingleUserAccountInfoPHP"%}

```php
<?php
$token = '35919068aa799eccdef19160e1da4bf21381d2a2';
$url = "https://cloud.minapp.com/oserve/v2.1/miniapp/user/account/70695404/";

$ch = curl_init();
$header = [
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
];
$payload = json_encode([
  "username" => "pretty_girl_php"]);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "email": "pretty_girl@example.com",
  "email_verified": false,
  "username": "pretty_girl"
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| username   | String | 用户名，不区分大小写 |
| email | String | 邮箱，不区分大小写 |
| email_verified | Boolean | 用户邮箱是否已激活 |

**状态码说明**

`200`: 成功。

`400`: password 错误、email 不合法、username 或 email 已经存在。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 用户不存在。
