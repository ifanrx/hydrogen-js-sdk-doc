<!-- ex_nonav -->

# 发送微信订阅消息

该接口给特定的用户发送一个特定的订阅消息

> **info**
> 可以通过查询接口在发送前查询可用订阅

> 智能过滤需要`个人版`及以上套餐版本

`BaaS.wechat.sendSubscribeMessage(data)`


**参数说明**

data 是 Object 类型，它包括以下几个属性

| 参数            | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| recipient_type  | String | 是   | 目前只支持 `user_id` |
| user_id         | String | 是   | 用户 ID |
| template_id     | String | 是   | 模板 ID （微信后台配置）|
| keywords        | Object | 是   | 关键字 |
| schema_name     | String | 否   | 数据表名，如果 recipient_type 为 schema_user 则为必填项，表示对该表名的数据表进行用户筛选  |
| page            | String | 否   | 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数。该字段不填则模板无跳转。|


<!-- | recipient_type 类型 | recipient_params     | 类型            | 说明                          | -->
<!-- |:------------------|:---------------------|:--------------|:----------------------------| -->
<!-- | user_id           | user_id              | Integer       | 推送单个用户，传入用户 ID (对应 _userprofile 表中的 id 字段)              | -->
<!-- | user_list         | user_list            | Integer Array | 推送批量用户，传入用户 id 列表           | -->
<!-- | user_group        | user_group_name      | String        | 用户组名，注意这里是提交用户组名称，而不是用户组 id | -->
<!-- | schema_user       | user_profile_filters | String        | 对指定数据表的查询条件，用于筛选用户        | -->



**请求示例**

```js
let data = {
  recipient_type: 'user_id',
  user_id: 23425,
  template_id: "tadfDf23asdi8dfd",
  page: "pages/index/index",
  keywords: {
    keyword1: {
      value: "书籍",
    },
    keyword2: {
      value: "50.5",
    }
  }
}

BaaS.wechat.sendSubscribeMessage(data).then(res => {
  // 发送成功
}, err => {
  // 发送失败
})
```

其中 keyword1, keyword2 为微信后台中实际关键词对应的键值

![关键词对应键值示例](/images/cloud-function/keyword.png)

<!-- ## user_profile_filters 语法 -->
<!--  -->
<!-- | 操作符     	| 示例                                                                                                       	| 示例说明                    	| -->
<!-- |------------	|------------------------------------------------------------------------------------------------------------	|-----------------------------	| -->
<!-- | =          	| { a:{ $eq: '123' } }                                                                                       	| a == '123'       	| -->
<!-- | <          	| { a: { $lt: 22 } }                                                                                         	| a 小于 22                   	| -->
<!-- | <=         	| { a: { $lte: 22 } }                                                                                        	| a 小于等于 22               	| -->
<!-- | >          	| { a: { $gt: 22 } }                                                                                         	| a 大于 22                   	| -->
<!-- | >=         	| { a: { $gte: 22 } }                                                                                        	| a 大于等于 22               	| -->
<!-- | in         	| { a: { $in: [123, 456] } }                                                                                 	| a 存在于 [123, 456] , eg: 123 in [123, 456]      	| -->
<!-- | range      	| { a: { $range: [0, 5] } }                                                                                  	| a 存在于 [0, 1, 2, 3, 4] 中, eg: 1 in [0, 1, 2] 	| -->
<!-- | !=         	| { a: { $ne: '123' } }                                                                                      	| a 不等于 '123', eg '456' != '123'          	| -->
<!-- | not in     	| { a: { $nin: [123, 456] } }                                                                                	| a 不在 [123, 456] 中, eg: 888 不在 [123， 456] 中    	| -->
<!-- | contains   	| { a: { $contains: '123'} }                                                                                 	| a 包含 '123', eg: 'abc123' 包含 ‘123’         	| -->
<!-- | regex      	| { a: { $regex: '123', $options: 'g'} }                                                                     	| a.match(/123/g)             	| -->
<!-- | all        	| { a: { $all: [1, 2, 3] } }                                                                                 	| a 包含了 [1, 2, 3] , eg: [1, 2, 3] 包含了  [1, 2]  	| -->
<!-- | is null    	| { a: { $isnull: true} } }                                                                                  	| a 是否为空                  	| -->
<!-- | center     	| { a: { $center: {"radius": 123, "coordinates": [1, 2]} } }                                                 	| 请参考[withincircle](../../../js-sdk/schema/geo.md)          	| -->
<!-- | intersects 	| { a: { $intersects: {"type": `GEOJSON`, "coordinates": [1, 2]} }}                                          	| 请参考[include](../../../js-sdk/schema/geo.md)                	| -->
<!-- | nearsphere 	| { a: {"$nearsphere":{"geometry":{"type":"Point","coordinates":[1,2]},"min_distance":3,"max_distance":4}} } 	| 请参考[withinRegion](../../../js-sdk/schema/geo.md)           	| -->