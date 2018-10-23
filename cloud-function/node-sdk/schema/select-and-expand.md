# 字段过滤与扩展

## 字段过滤

使用 select 来控制请求返回的字段

**在 get 方法中使用**

```js
var Product = new BaaS.TableObject(tableID)
var recordID = 'xxxxxxxxx' // 指定数据行 id

// 规定返回特定字段
Product.select('created_at').get(recordID)
// or
Product.select(['created_at', 'created_by']).get(recordID)

// 规定不返回特定字段
Product.select('-created_at').get(recordID)
// or
Product.select(['-created_at', '-created_by']).get(recordID)
```

**在 find 方法中使用**

```js
var Product = new BaaS.TableObject(tableID)

var query = new BaaS.Query()
query.compare('amount', '>', 0)

// 规定返回特定字段
Product.setQuery(query).select('created_at').find()
// or
Product.setQuery(query).select(['created_at', 'created_by']).find()

// 规定不返回特定字段
Product.setQuery(query).select('-created_at').find()
// or
Product.setQuery(query).select(['-created_at', '-created_by']).find()
```

<span class="attention">注：</span>

通过数组控制请求返回字段时，若数组内元素同时存在“规定返回”和“规定不返回”的字段，如：`['-created_at', 'created_by']`。后端服务会忽略掉此次操作，直接返回所有字段。

## 字段扩展

目前仅支持 expand created_by。返回结果中的 created_by 会被替换为这个字段对应的完整对象，也即这条记录的创建者信息。

### expand 返回结果示例

不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 1234,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
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
}
```

### 使用方法
**在 get 方法中使用**
```js
var Product = new BaaS.TableObject(tableID)
Product.expand('created_by').get('5acc2904da6b737322a82f78')
```

**在 find 方法中使用**
```js
var Product = new BaaS.TableObject(tableID)

var query = new BaaS.Query()
query.compare('amount', '>', 0)

// 扩展特定字段
Product.setQuery(query).expand('created_by').find()
```