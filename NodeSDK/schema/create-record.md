# 新增数据记录

##### 请求示例

```
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let Product = new BaaS.TableObject(tableID)
let product = Product.create()

// 设置方式一
let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}
product.set(apple).save().then( (res) => {
  // success
}, (err) => {
  // err
})

// 设置方式二
product.set('name', 'apple')
product.set('price', 1)
product.set('desc', ['good'])
product.set('amount', 0)

product.save().then((res) => {}, (err) => {})
```

##### 返回示例 （res.statusCode === 201）

res.data:
```
{
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
```

### Tip

- 插入的数据要与预先在知晓云平台设定的数据类型一致
- 时间类型的数据需要是 ISO 格式的字符串

  ```
  ((new Date()).toISOString()).toString()
  ```

- 添加 file 类型

  <span style='color:red'>* sdk version >= v1.1.2</span>

  ```
  let MyFile = new BaaS.File()
  MyFile.upload(params).then((res) => {
    product.set('manual', res.data.file)
    product.save()
  })
  ```

  <span style='color:red'>* sdk version >= v1.1.1</span>

  ```
  BaaS.uploadFile(params).then((res) => {
    let data = JSON.parse(res.data)
    product.set('manual', data.file)
    product.save()
  })
  ```