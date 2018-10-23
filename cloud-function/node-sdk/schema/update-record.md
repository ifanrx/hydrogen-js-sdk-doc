# 更新数据项

## 操作步骤

1.通过 `数据表 ID` 或 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new BaaS.TableObject(tableID | tableName)`

**参数说明**

tableID 和 tableName 二选一，不能同时存在

| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableID   | integer | 数据表的 ID                          |
| tableName | string  | 数据表名                             |

2.通过数据行 id（以下用 `recordID` 参数名表示）设置指定记录

`let MyRecord = MyTableObject.getWithoutData(recordID)`

**参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据行 id |

3.修改指定记录的数据

`MyRecord.set(data)`

该方法支持两种类型的赋值操作：

a.一次性赋值：

```js
MyRecord.set({
  key1: value1,
  key2: value2
})
```

b.逐个赋值

```js
MyRecord.set(key1, value1)
MyRecord.set(key2, value2)
```

> **info**
> 对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据

4.将修改后的记录保存到服务器

`MyRecord.update()`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。


## 普通数据更新

**请求示例**

```js
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 price 字段
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new BaaS.TableObject(tableID)
let product = Product.getWithoutData(recordID)

product.set('price', 11)
product.update().then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

then 回调中的 res 对象结构如下：

```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "created_at": 1487053095,
    "id": "7",
    "name": "fushi",
    "price": 11,
    "desc": ["sweet", "red"],
    "amount": 2
  }
}
```


err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 400            | 1. 提交的数据不合法、2. 重复创建数据（设置了唯一索引）    |
| 403            | 没有权限更新数据    |
| 404            | 数据行不存在    |



## 计数器原子性更新

对数字类型的字段进行原子性增减操作。当请求同时对一个数据进行增减时，原子性使得冲突和覆盖导致的数据不正确的情况不会出现。

`product.incrementBy(key, value)`

**参数说明**

| 参数   | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | Number 或 Integer | 是  | 与 key 的类型保持一致 |

**请求示例**

```js
product.incrementBy('amount', 1)
product.update().then(res => {}, err => {})
```


## 数组原子性更新

#### 将 _待插入的数组_ 加到原数组末尾

`product.append(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :----------------- | :-- | :--- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | - |

**请求示例**

```js
product.append('desc', ['big'])
// or
product.append('desc, 'big')
```

#### 将 _待插入的数组_ 中不包含在原数组的数据加到原数组末尾

`product.uAppend(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是   | - |

**请求示例**

```js
product.uAppend('desc', ['sweet'])
// or
product.uAppend('desc, 'sweet')
```

#### 从原数组中删除指定的值

`product.remove(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | - |

**请求示例**

```js
product.remove('desc', ['sweet'])
// or
product.remove('desc', 'sweet')
```

> **info**
> 对**同一字段**设置多次 `append` 或 `remove` 操作后进行 `update` 操作，则只有最后一次进行的 `append` 或 `remove` 是有效的；如果同时对**同一字段**进行 `set`、`remove` 和 `append` 操作，则只有最后执行的操作是有效的。

<span class="attention">注：</span> 设置的数据要与预先在知晓云平台设定的数据类型一致，当仅更新一个字段，并且数据不合法时，将无法成功保存，请求返回 `Failed to save record, type conflict on fields` 错误，如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存，如下示例：

```js
/*
* 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个字符串类型的值，
* 该请求会返回 200，但只有 amount 被成功设置为 10
*/

let order = Order.getWithoutData(orderID)
order.set('amount', 10)
order.set('date', 'abc')
order.update()
```

## 批量更新数据项

通过设置查询条件，将符合条件的数据进行批量更新操作。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

```js
let MyTableObject = new BaaS.TableObject(tableID)

let query = new BaaS.Query()

// 设置查询条件（比较、字符串包含、组合等）
...

let records = MyTableObject.limit(10).offset(0).getWithoutData(query)

// 与更新特定记录一致
records.set(key1, value1)
records.incrementBy(key2, value2)
records.append(key3, value3)

records.update().then(res => {}, err => {})
```

**返回示例**

then 回调中的 res 对象结构如下：

```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "succeed": 8, // 成功更新记录数
    "total_count": 10,  // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 1000,
    "next": null // 下一次更新 url，若为 null 则表示全部更新完毕
  }
}
```

**状态码说明**

200 更新成功，400 请求数据非法

<span class="attention">注：</span> 由于对数据表的增删改均会触发 trigger 动作，为了防止出现严重消耗系统资源的情况，对数据表进行批量操作的数据条目最多不能超过 1000 条。


## 更新 object 类型内的属性
```javascript
product.patchObject('obj1', {name: '123'})
```

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | Object              | 是  | 更新的对象 |

> **info**
> 该操作的效果类似 Object.assign(), 是浅合并，也就是只合并第一层，嵌套的属性仍然是被替换。
> 对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的

**请求示例**
假设数据表 Product 中有数据行如下
```javascript
[{
   id: "7",
   obj1: {a: [1, 2, 3], b: 666, c: {age: 100}}
}]
```

```javascript
let record = Product.getWithoutData('7')

let patch = {a: [222], b: 555, d: 888}
record.patchObject('obj1', patch)

```
执行结果

```javascript
[
  {
    id: '7',
    obj1: {a: [222], b: 555, c: {age: 100}, d: 888}
  }
]
```
