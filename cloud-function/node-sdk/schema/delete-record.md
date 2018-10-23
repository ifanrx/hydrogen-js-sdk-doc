# 删除数据项

## 操作步骤

1.通过 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new BaaS.TableObject(tableName)`

**参数说明**

tableName 二选一，不能同时存在

| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableName | string  | 数据表名                             |

2.指定数据行 id（以下用 `recordID` 参数名表示） 执行删除操作

`MyTableObject.delete(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据行 id |


## 示例

**请求示例**
```js
// 删除 tableName 为 product 的数据表中数据行 id 为 '59897882ff650c0477f00485' 的数据项
let tableName = 'product'
let recordID = '59897882ff650c0477f00485'

let Product = new BaaS.TableObject(tableName)
Product.delete(recordID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

then 回调中的 res 对象结构如下：

```json
{
  "status": 204,
  "statusText": "No Content",
  "data": ""
}
```

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |
| 403            | 没有权限删除数据   |

## 批量删除数据项

通过设置查询条件，将符合条件的数据进行批量删除操作。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

```js
let MyTableObject = new BaaS.TableObject(tableName)

let query = new BaaS.Query()

// 设置查询条件（比较、字符串包含、组合等）
//...

MyTableObject.limit(10).offset(0).delete(query).then(res => {
  // success
}, err => {
  // error
})
```

**返回示例**

then 回调中的 res 对象结构如下：

```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "succeed": 8, // 成功删除记录数
    "total_count": 10, // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 10,
    "next": null // 下一次删除 url，若为 null 则表示全部删除完毕
  }
}
```

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |
| 403            | 没有权限删除数据   |

**状态码说明**

<span class="attention">注：</span> 由于对数据表的增删改均会触发 trigger 动作，为了防止出现严重消耗系统资源的情况，对数据表进行批量操作的数据条目最多不能超过 1000 条。
