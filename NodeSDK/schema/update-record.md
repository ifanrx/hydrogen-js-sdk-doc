# 更新数据项

### 普通数据更新

##### 请求示例

```
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 price 字段
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new BaaS.TableObject(tableID)
let product = Product.getWithoutData(recordID)

product.set('price', 11)
product.update().then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": "7",
  "name": "fushi",
  "price": 11,
  "desc": [
    "sweet",
    "red",
  ],
  amount: 2
}
```

-- --

### 计数器更新（对数字类型的字段进行原子性增减操作）

`product.incrementBy(key, value)`

##### 参数说明

|  参数名  |  类型  |  必填  |  描述  |
| :-----------: | :----: | :--: | :------------------------ |
|  key  |  String |  是  |  在数据表中的类型必须是 Number 或 Integer  |
|  value  |  Number 或 Integer  |  是  |  与 key 的类型保持一致  |

##### 请求示例

```
product.incrementBy('amount', 1)
product.update().then( (res) => {}, (err) => {})
```

__ __

### 数组原子性更新

#### 将待插入数组加到原数组末尾

`product.append(key, value)`

##### 参数说明

|   参数名   |   类型   |  必填  |   描述   |
| :-----------: | :----: | :--: | :------------------------ |
| key | String | 是 | 在数据表中的类型必须是 Array |
| value | Array 或 Array item |  是   |  |

##### 请求示例

```
product.append('desc', ['big'])
// or
product.append('desc, 'big')
```

#### 将待插入数组中不包含在原数组的数据加到原数组末尾

`product.uAppend(key, value)`

##### 参数说明

|   参数名   |   类型   |  必填  |   描述   |
| :-----------: | :----: | :--: | :------------------------ |
| key | String | 是 | 在数据表中的类型必须是 Array |
| value | Array 或 Array item |  是   |  |

##### 请求示例

```
product.uAppend('desc', ['sweet'])
// or
product.uAppend('desc, 'sweet')
```

#### 从原数组中删除指定的值

`product.remove(key, value)`

##### 参数说明

|   参数名   |   类型   |  必填  |   描述   |
| :-----------: | :----: | :--: | :------------------------ |
| key | String | 是 | 在数据表中的类型必须是 Array |
| value | Array 或 Array item |  是   |  |

##### 请求示例

```
product.remove('desc', ['sweet'])
// or
product.remove('desc', 'sweet')
```