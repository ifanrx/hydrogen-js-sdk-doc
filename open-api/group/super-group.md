# 组集操作

## 获取组集详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/user-supergroup/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**代码示例**

{% tabs getDetailCurl="Curl", getDetailNode="Node", getDetailPHP="PHP" %}

{% content "getDetailCurl" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-supergroup/52/
```

{% content "getDetailNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/666',  // 666 对应 :group_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% content "getDetailPHP"%}

```php
<?php
$group_id = 1; // 用户组 ID
$url = "https://cloud.minapp.com/oserve/v1/user-supergroup/{$group_id}/";
$ch = curl_init();

$header = array(
  "Authorization: Bearer {$token}",
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
  "children": [
    {
      "id": 51,
      "name": "User Group"
    }
  ],
  "id": 52,
  "name": "Super Group"
}
```


## 获取组集列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/user-supergroup/`

**参数说明**

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| limit  | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

{% tabs getCurl="Curl", getNode="Node", getPHP="PHP" %}

{% content "getCurl" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
https://cloud.minapp.com/oserve/v1/user-supergroup/
```

{% content "getNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "getPHP"%}

```php
<?php
$url = 'https://cloud.minapp.com/oserve/v1/user-supergroup/';

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
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


## 创建组集

**接口**

`POST https://cloud.minapp.com/oserve/v1/user-supergroup/`

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :--------| :----- | :-- | :-- |
| name     | String | Y   | 组集的名称 |
| children | String | N   | 用户组 ID 列表 |

**代码示例**

{% tabs createCurl="Curl", createNode="Node", createPHP="PHP" %}

{% content "createCurl" %}

```
curl -X POST \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "Super Group", "children": [51]}' \
https://cloud.minapp.com/oserve/v1/user-supergroup/
```

{% content "createNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'super group',
    children: [561]
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "createPHP" %}
```php
<?php
$param = array(
  'name' =>'Super Group',
  'children' => [51]
);
$url = 'https://cloud.minapp.com/oserve/v1/user-supergroup/';

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);

```

{% endtabs %}

**状态码说明**

`201` 写入成功


## 修改组集

> **danger**
> 该接口会清除掉旧有的组集和用户组的关系，重新与传入的用户组建立关系

**接口**

`PUT https://cloud.minapp.com/oserve/v1/user-supergroup/:group_id/`

其中 `:group_id` 需替换为你的用户组 ID

**状态码说明**

`200` 修改成功

**代码示例**

{% tabs updateCurl="Curl", updateNode="Node", updatePHP="PHP" %}

{% content "updateCurl" %}

```
curl -X PUT \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "super group 3", "children": [51]}' \
https://cloud.minapp.com/oserve/v1/user-supergroup/52/
```

{% content "updateNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/666/',  // 665 对应 :group_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'super group',
    children: [561]
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode, body)
})
```

{% content "updatePHP" %}

```php
<?php
$group_id = 52; // 用户组 ID
$url = "https://cloud.minapp.com/oserve/v1/user-supergroup/{$group_id}/";
$param = array(
  'name' =>'testCreateFiles',
  'children' => [51]
);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

**返回示例**

```json
{
  "children": [
    {
      "id": 51,
      "name": "User Group"
    }
  ],
  "id": 52,
  "name": "super group 3"
}
```

## 删除组集

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/user-supergroup/:group_id/`

**代码示例**

{% tabs deleteCurl="Curl", deleteNode="Node", deletePHP="PHP" %}

{% content "deleteCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-supergroup/52/
```

{% content "deleteNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/666/',  // 666 对应 :group_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "deletePHP" %}

```php
<?php
$group_id = 52; // 用户组 ID
$url = "https://cloud.minapp.com/oserve/v1/user-supergroup/{$group_id}/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

**状态码说明**

`204` 删除成功


## 批量删除组集

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/user-supergroup/?id__in=:group_id,group1_id`

**代码示例**

{% tabs patchDeleteCurl="Curl", patchDeleteNode="Node", patchDeletePHP="PHP" %}

{% content "patchDeleteCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-supergroup/?id__in=58,56
```

{% content "patchDeleteNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/?id__in=667,668',  // id__in=:667,668 对应 id__in=:group_id,group1_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "patchDeletePHP" %}

```php
<?php
// 用户组 ID 集
$group_id[] = 56;
$group_id[] = 58; 
$url = "https://cloud.minapp.com/oserve/v1/user-supergroup/?id__in=".implode(',',$group_id);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

**状态码说明**

`204` 删除成功