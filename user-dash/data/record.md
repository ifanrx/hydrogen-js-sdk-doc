# 数据操作

获得数据表数据接口，支持对**内置表自定义字段的获取与修改**

## 查询数据

**接口**

`GET https://cloud.minapp.com/userve/v2.2/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| order_by | String | N   | 对资源进行字段排序 |
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| return_total_count   | Number | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

例如需要查询价格为 10 元的物品时，我们应该这样构造查询语句:

```json
{
  "price": {"$eq": 10}
}
```

执行

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.2/table/1/record/', {params: {where: {price: {$eq: 10}}}}).then(res => {
  console.log(res.data)
})
```

该接口完整支持的查询操作符如下：

| 查询操作符  | 含义 |
| :-------  | :-- |
| $eq       | 等于 |
| $ne       | 不等于 |
| $lt       | 小于 |
| $lte      | 小于等于 |
| $gt       | 大于 |
| $gte      | 大于等于 |
| $contains | 包含任意一个值 |
| $nin      | 不包含任意一个数组值 |
| $in       | 包含任意一个数组值 |
| $isnull   | 是否为 NULL |
| $range    | 包含数组值区间的值 |

使用以上查询操作符即可完成一些简单的条件查询，同时，你也可以使用 `$and` 和 `$or` 查询操作符，对以上查询操作符进行组合使用，完成更复杂的条件查询，如查询 __价格为 10 元且产品名称中包含 “包” 的物品__ 或 __价格大于 100 元的物品__，其筛选条件为：

```json
{
  "$or": [
    {
      "$and": [
        {
          "price": {"$eq": 10}
        },
        {
          "name": {"$contains": "包"}
        }
      ]
    },
    {
      "price": {"$gt": 100}
    }
  ]
}
```

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/userve/v2.2/table/:table_id/record/?limit=1&return_total_count=1
``` 

## 排序返回查询数据

查询接口默认按**创建时间倒序**的顺序来返回数据列表，你也可以通过设置 `order_by` 参数来实现。

示例：

```
# 顺序
https://cloud.minapp.com/userve/v2.2/table/:table_id/record/?order_by=created_at

# 倒序
https://cloud.minapp.com/userve/v2.2/table/:table_id/record/?order_by=-created_at
```

## 获取数据项

**接口**

`GET https://cloud.minapp.com/userve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

## 写入数据

**接口**

`POST https://cloud.minapp.com/userve/v2.2/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

`file` 类型字段的更新比较特殊，需要先将文件上传，拿上传结果中返回的 id 字段调用 [文件模块：文件操作：获取文件详情](https://doc.minapp.com/user-dash/file/file.html#%E8%8E%B7%E5%8F%96%E6%96%87%E4%BB%B6%E8%AF%A6%E6%83%85)
接口后，将返回的文件详情结果设为字段值进行写入。

> **info**
> 插入的数据要与预先在知晓云平台设定的数据类型一致

**状态码说明**

`201` 写入成功，`400` 请求参数有错


## 更新数据

本接口提供数据更新的能力，通过指定表 ID 以及 Record ID 来完成操作， 需注意，更新的数据所包含的字段需要与数据表中定义的字段一致。

**接口**

`PUT https://cloud.minapp.com/userve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

`file` 类型字段的更新比较特殊，需要先将文件上传，拿上传结果中返回的 id 字段调用 [文件模块：文件操作：获取文件详情](https://doc.minapp.com/user-dash/file/file.html#%E8%8E%B7%E5%8F%96%E6%96%87%E4%BB%B6%E8%AF%A6%E6%83%85)
接口后，将返回的文件详情结果设为字段值进行更新。

> **info**
> 更新的数据要与预先在知晓云平台设定的数据类型一致

**状态码说明**

`201` 更新成功，`400` 请求参数有错


## 数据删除

> **danger**
> 本接口可直接删除任意数据，不受 ACL 控制

**接口**

`DELETE https://cloud.minapp.com/userve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**状态码说明**

`204` 删除成功


## 数据原子性更新

当请求同时对一个数据进行修改时，原子性更新使得冲突和覆盖导致的数据不正确的情况不会出现，目前支持的数据类型是**数字类型**和**数组类型**

**接口**

`PUT https://cloud.minapp.com/userve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

本接口支持以下原子性操作：

(1) `incr_by` 对数字类型的字段的值进行增减操作

将对象中的价格（price）字段加 1

```json
{
  "price": {
    "$incr_by": 1
  }
}
```

将对象中的价格（price）字段减 1

```json
{
  "price": {
    "$incr_by": -1
  }
}
```

(2) `append` 对数组类型的字段的值追加一个数组

往对象中的 tag 字段追加 「Hello」

```json
{
  "tag": {
    "$append": ["Hello"]
  }
}
```

(3) `append_unique` 对数组类型的字段的值追加一个数组，但追加的数组里的数组项，如果已存在于原数组中，则该**数组项**不会再被追加

往对象中的 tag 字段追加 「Hello」，tag 字段依然为 `["Hello"]`

```json
{
  "tag": {
    "$append_unique": ["Hello"]
  }
}
```

(4) `remove` 从数组类型的字段的值里，删除包含在指定数组中的数组项

往对象中的 tag 字段删除 「Hello」

```json
{
  "tag": {
    "$remove": ["Hello"]
  }
}
```

**状态码说明**

`200` 更新成功，`400` 操作符不支持/请求参数有错


> **danger**
> 以下操作仅适用于 API version >= v1.8


## pointer 查询

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**接口**

`GET https://cloud.minapp.com/userve/v2.2/table/:table_id/record/?where=query`

其中 `:table_id` 需替换为你的数据表 ID，query 为查询条件

**示例代码**

假设现在有两张表： order 表和 customer 表，order 表中有一个类型为 pointer，名称为 user 的字段，指向了 customer 表的数据行。
现在需要查询 order 表中，user 字段指向 customer 表中 id 为 `5bf4f7457fed8d6c2f5c3d6e` 的数据行。

{% tabs pointerFirst="Node", pointerSecond="Python", pointerThird="PHP" %}

{% content "pointerFirst" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/userve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({   // 可选, 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码
      "user": {"$eq": "5bf4f7457fed8d6c2f5c3d6e"}
    }),
    order_by: 'id',   // 可选
    offset: 0,    // 可选
    limit: 20,    // 可选
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "pointerSecond" %}

```python
import json
import urllib

import requests


table_id = ''
BASE_API = r'https://cloud.minapp.com/userve/v2.2/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Bearer %s' % TOKEN
}

where_ = {
  'user': {'$eq': "5bf4f7457fed8d6c2f5c3d6e"},
}

query_ = urllib.urlencode({
  'where': json.dumps(where_),
  'order_by': '-id',
  'limit': 10,
  'offset': 0,
})

API = '?'.join((BASE_API, query_))

resp_ = requests.get(API, headers=HEADERS)
print resp_.content
```

{% content "pointerThird" %}

```php
<?php
$table_id = 1; // 数据表 ID
$condition = array(
  'order_by' => '-id',
  'where' => json_encode(['user' => ['$eq' => '5bf4f7457fed8d6c2f5c3d6e']]),
  'limit' => '10',
  'offset' => '0',
);
$url = "https://cloud.minapp.com/userve/v2.2/table/{$table_id}/record/?";
$url .= http_build_query($condition);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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


## 字段扩展

支持 expand created_by 以及 pointer 类型字段。返回结果中的 created_by 以及扩展的 pointer 类型字段会被替换为这个字段对应的完整对象。

> **info**
> 字段扩展功能仅支持在 v1.8 及以上版本接口使用

**接口**

`GET https://cloud.minapp.com/userve/v2.2/table/:table_id/record/?expand=pointer,created_by`

其中 `:table_id` 需替换为你的数据表 ID

### expand 返回结果示例
不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 1234,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer": {"id": "5a2fa9b008443e59e0e67889", "_table": "pointer"}
}
```

使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": {
    "avatar": "https://media.ifanrusercontent.com/tavatar/fb/cd/xxxx.jpg",
    "id": 62536607,
    "nickname": "Larry。"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer": {
    "id": "5a2fa9b008443e59e0e67889",
    "_table": "pointer",
    "customized_field": "field_content"
  }
}
```

**代码示例**

{% tabs expandFirst="Node", expandSecond="Python", expandThird="PHP" %}

{% content "expandFirst" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/userve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({   // 可选, 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码
      "price": {"$eq": 10}
    }),
    order_by: 'id',   // 可选
    offset: 0,    // 可选
    limit: 20,    // 可选
    expand: 'pointer,created_by',    //必选，表示需要扩展的字段
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "expandSecond" %}

```python
import json
import urllib

import requests


table_id = ''
BASE_API = r'https://cloud.minapp.com/userve/v2.2/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Bearer %s' % TOKEN
}

where_ = {
  'price': {'$gt': 100},
}

query_ = urllib.urlencode({
  'where': json.dumps(where_),
  'order_by': '-id',
  'limit': 10,
  'offset': 0,
  'expand': 'pointer,created_by'
})

API = '?'.join((BASE_API, query_))

resp_ = requests.get(API, headers=HEADERS)
print resp_.content
```

{% content "expandThird" %}

```php
<?php
$table_id = 1; // 数据表 ID
$condition = array(
  'order_by' => '-id',
  'where' => json_encode(['price' => ['$gt' => 'test search']]),
  'limit' => '10',
  'offset' => '0',
  'expand' => 'pointer,created_by'
);
$url = "https://cloud.minapp.com/userve/v2.2/table/{$table_id}/record/?";
$url .= http_build_query($condition);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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


## 添加 pointer 类型数据

**接口**

`POST https://cloud.minapp.com/userve/v2.2/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**代码示例**

{% tabs pointerInsertNode="Node", pointerInsertPHP="PHP" %}

{% content "pointerInsertNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/userve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'nickname',
    desc: ['description'],
    price: 19,
    amount: 19,
    code: '18814098707'
    pointer: '5a2fa9b008443e59e0e67889',    // pointer 关联的数据 ID
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "pointerInsertPHP" %}
```php
<?php
$table_id = 1;
$param = array(
  'pointer' => '5a2fa9b008443e59e0e67889'
);
$url = "https://cloud.minapp.com/userve/v2.2/table/{$table_id}/record/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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

`201` 写入成功，`400` 请求参数有错


## 更新 pointer 类型数据

**接口**

`PUT https://cloud.minapp.com/userve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**代码示例**

{% tabs pointerUpdateNode="Node", pointerUpdatePHP="PHP" %}

{% content "pointerUpdateNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/userve/v2.2/table/3906/record/5a6ee2ab4a7baa1fc083e3xx',  // 3906 对应 :table_id, 5a6ee2ab4a7baa1fc083e3xx 对应 :record_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    pointer: '5a2fa9b008443e59e0e67889',    // pointer 关联的数据 ID
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "pointerUpdatePHP" %}

```php
<?php
$table_id = 1; // 数据表 ID
$record_id = '5a6ee2ab4a7baa1fc083e3xx'; // 记录 ID
$url = "https://cloud.minapp.com/userve/v2.2/table/{$table_id}/record/{$record_id}/";
$param['pointer'] = '5a2fa9b008443e59e0e67889';

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

**状态码说明**

`200` 更新成功，`400` 请求参数有错
