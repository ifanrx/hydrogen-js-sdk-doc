# 用户模块

## 获取用户详情

**接口**

~~`GET https://cloud.minapp.com/oserve/v1/miniapp/user-profile/:profile_id/`~~

~~其中 `:profile_id` 需替换为用户 ID~~（已废弃）

`GET https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?user_id={{ user_id }}`

其中 `user_id` 需替换为用户 ID

**代码示例**

{% tabs  curl="Curl", node="Node" %}

{% content "curl"%}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?user_id=55019
```

{% content "node" %}

```js
var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?user_id=4271xx',   // 4271xx 对应 :user_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% endtabs %}

**返回示例**

```json
{
  "avatar": "https://media.ifanrusercontent.com/media/tavatar/55/c3/55c3dbebcc61891be10d29ded808c84a01dcf864.jpg",
  "city": "Guangzhou",
  "country": "China",
  "created_at": 1504504504,
  "gender": 1,
  "id": 55019,
  "nickname": "PCG",
  "openid": "onzns0KsLKFyg3-VcW0GwTE652_k",
  "unionid": "onzns0KsLKFyg3-VcW0GwTE652_k",
  "province": "Guangdong",
  "user_group": [
      137
  ],
  "user_id": 36619758
}
```


## 获取用户列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/miniapp/user-profile/`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| created_at | String | N   | 用户创建的时间，值为时间戳。查询创建时间大于等于 2017-01-01 的用户 `created_at__gte=1483228800`，查询创建时间小于等于 2017-01-01 的用户：`created_at__lte=1483228800` |
| gender     | Number | N   | 户的性别，其中 `1` 表示男，`2` 表示女 |
| group      | String | N   | 给定用户组 ID 查询在用户组下的用户列表。只支持 `in` 查询：`group__in=258,360`|
| limit      | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| nickname   | String | N   | 用户的微信昵称，支持等值查询 `nickname=Tom`, 模糊查询 `nickname__contains=Tom` |
| offset     | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| openid     | String | N   | 用户的 OpenID |
| order_by   | String | N   | 排序（支持 `created_at` 进行排序） |
| unionid    | String | N   | 用户的 UnionID |
| user_id    | String | N   | 用户 ID |

**代码示例**

{% tabs first="Curl", second="Node" %}

{% content "first" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
-d nickname__contains=Tom \
-d gender=1 \
-d created_at__gt=1483228800 \
-d order_by=-created_at \
https://cloud.minapp.com/oserve/v1/miniapp/user-profile/
```

{% content "second" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/miniapp/user-profile/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    nickname__contains: 'username',
    gender: 1,
    created_at__gte: 1483228800,
    user_id: '363953xx',
    order_by: '-created_at'
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% endtabs %}
