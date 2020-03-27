<!-- ex_nonav -->

# 数据表

数据存储是知晓云提供的核心功能之一，借助它，你可以省去自己搭建数据库，维护数据库及优化数据库查询等麻烦操作。通过以下操作，便可以向在控制台创建的数据表添加一条记录：

要操作数据表，需要借助 `TableObject` 对象，每个 TableObject 实例对应一张数据表，通过 TableObject 实例，你可以对数据表进行增删改查的操作。

当我们需要创建一行新的数据时，使用 `create()` 方法, 该方法无需传入参数，`create()` 方法 返回值为 `BaaS.TableRecord` 对象。

通过 `TableRecord` 实例的 `set` 和 `save` 方法，可以完成数据行的创建。

{% ifanrxCodeTabs %}
```js
let tableName = 'product'
// 通过 `tableName` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表
let Product = new wx.BaaS.TableObject(tableName)
// 本地创建一条空记录
let product = Product.create() // product 为 TableRecord 实例

let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}

// 为上面创建的空记录赋值，并保存到服务器，save() 方法返回一个 Promise 对象
product.set(apple).save().then(res => { 
  console.log(res)
})
```
{% endifanrxCodeTabs %}

**返回示例**

res 结构如下：

```json
{
  "statusCode": 201,
  "data": {
      "_id": "59a3c2b5afb7766a5ec6e84e",
      "amount": 0,
      "created_at": 1503904437,
      "created_by": 36395395,
      "desc": ["good"],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "price": 1.0,
      "read_perm": ["user:*"],
      "updated_at": 1503904437,
      "write_perm": ["user:*"]
  }
}
```


数据表支持多种类型的数据，包括数组类型，时间日期类型，geojson 类型和文件类型，并且支持原子操作等高级功能，如下，既是对产品数量的进行原子性减 1 操作：

通过 `TableObject` 实例上的 `getWithoutData()` 方法，我们得到一个 `TableRecord` 实例，该实例指向了 id 为 `recordID` 的数据行，接下来的对该 `TableRecord` 实例的操作会修改数据表中对应数据行的内容。



```js
let recordID = 'xxxxxxxxxx' // 数据行 id
let product = Product.getWithoutData(recordID)  // product 为 TableRecord 实例，指向了线上 id 为 recordID 的数据行
// 执行原子性减 1
product.incrementBy('amount', -1)  // 调用 TableRecord 实例的 incrementBy 方法
product.update().then(res => {  // 调用 TableRecord 实例的 update 方法，保存对数据行的修改，update 返回值为一个 Promise 对象
  console.log(res)
})
```


**返回示例**

res 结构如下：

```json
{
  "statusCode": 200,
  "data": {
      "_id": "59a3c2b5afb7766a5ec6e84e",
      "amount": -1,
      "created_at": 1503904437,
      "created_by": 36395395,
      "desc": ["good"],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "price": 1.0,
      "read_perm": ["user:*"],
      "updated_at": 1503904437,
      "write_perm": ["user:*"]
  }
}
```

同时，SDK 提供了多种复杂查询操作，包括正则匹配查询，数组查询，甚至是与或的组合查询，如下是正则匹配查询的使用：

使用高级查询我们需要创建一个 `BaaS.Query` 对象实例，通过在 `Query` 实例上调用 `matches`、`compare` 等方法来设置查询条件，

然后调用 `TableObject` 实例的 `setQuery` 方法，来设置查询条件。

最后调用 `TableObject` 实例的 `find` 方法，来发起查询。find 方法返回值为一个 Promise。

{% ifanrxCodeTabs %}
```js
// 假设 product 表有一个字段为 product_id ，其中数据的格式形如 '112233'
let Product = new wx.BaaS.TableObject(tableName)
var query = new wx.BaaS.Query()

// 查找产品 ID 以 11 开头，以 33 结尾的产品
regx = /^11\d+33$/

query.matches('product_id', regx)
Product.setQuery(query).find().then(res => { // find 方法返回值为一个 Promise
  console.log(res)
})
```
{% endifanrxCodeTabs %}

**返回示例**

res 结构如下

```json
{
  "statusCode": 200,
  "data": {
    "meta": { // 数据列表的元信息
    "limit": 20, // 最大返回数据条数，默认是 20，具体请参考 分页与排序 章节
    "next": null, // 下一页的请求链接，null 表示没有下一页
    "offset": 0, // 当前数据列表的分页信息，具体请参考 分页与排序 章节
    "previous": null, // 上一页的请求链接，null 表示没有上一页
    "total_count": 2 // 查询条件命中的总条数
    },
    "objects": [
      {
        "created_at": 1487053098,
        "id": "59a3c2b5afb7766a5ec6e84f",
        "product_id": "112233"
      },
      {
        "created_at": 1487053095,
        "id": "59a3c2b5afb7766a5ec6e84e",
        "product_id": "112333"
      }
    ]
  }
}
```

## 数据表匿名读写权限特别说明

2.x 加入了数据表的匿名读写功能，开启该功能后，在用户未登录的情况下也可以读取数据。
而由于数据的添加与更改需要进行用户追踪（安全第一），打开了匿名写权限的数据表，
在写操作之前，**也需要先完成登录或先创建一个临时匿名用户**（详见[创建临时匿名用户](/js-sdk/auth.md#创建临时匿名用户)）。
否则，将返回 401 错误。

阅读以下章节，了解更多数据表操作接口：

* [数据类型](./data-type.md)
* [新增数据项](./create-record.md)
* [更新数据项](./update-record.md)
* [删除数据项](./delete-record.md)
* [获取数据项](./get-record-detail.md)
* [查询数据项](./query.md)
* [分页和排序](./limit-and-order.md)
* [地理位置操作](./geo.md)
* [API 参考](./api-reference.md)
