# 实时数据库（WebSocket）

该功能可实现订阅数据表的数据增删改变化，当表数据改变时，客户端可以实时接收到数据的变化。

> **danger**
> 该操作适用于 SDK version >= 1.0.0-alpha-3

## 操作步骤

> **info**
> 使用实时数据库功能前需要先进行[登录操作](/flutter-sdk/user/auth.md#登录)

1.通过 `tableName` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

```dart
TableObject tableObject = new TableObject(tableName);
```

**参数说明**

| 名称     | 类型   | 必填   | 说明                   |
| :-----  | :----- | :---- | :--- |
| tableName | String |  是 | 数据表名 |

> **info**
> 实时数据库功能无法订阅内置数据表，如 _userprofile 表、_richtextcontent 表等

2.发起数据表订阅操作

`var myEvent = tableObject.subscribe(event, where, onInit, onEvent, onError);`

**参数说明**

| 名称     | 类型   | 必填   | 说明                                          |
| :-----  | :----- | :---- | :--- |
| event    | String | 是  | 表数据变化的类型，有三种：create、update 和 delete    |
| where | Where |  否 | 查询条件 |
| onInit | Function |  否 | 订阅成功回调 |
| onEvent | Function |  否 | 订阅数据变化回调 |
| onError | Function |  否 | 订阅动作出错回调 |

> **info**
>
> - `create`、`update` 和 `delete` 三种数据变化类型需要分别订阅
> - `onInit` 回调函数将在订阅动作初始化成功时调用，一次 subscribe 订阅动作会触发一次
> - `onEvent` 回调函数将在数据表每次有相应动作变化时调用，参数是数据表变化了的数据项，三种事件类型对应得到的回调参数对象结构见下表
> - `onError` 回调函数将在订阅动作出错是调用，参数是错误信息

**onevent 回调函数参数说明**

`create` 事件得到的 `WampCallback` 类型：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_create"   |
| schema_id   | int  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 新增的数据行的 ID            |
| after       | Map  | 新增的数据行对象              |
| before      | Map  | 空对象                      |

`update` 事件得到的 `WampCallback` 类型：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_update"   |
| schema_id   | int  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 更新的数据行的 ID            |
| after       | Map  | 更新后的数据行对象            |
| before      | Map  | 更新前的数据行对象            |

`delete` 事件得到的 `WampCallback` 类型：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_delete"   |
| schema_id   | int  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 删除的数据行的 ID            |
| after       | Map  | 空对象                      |
| before      | Map  | 删除前的数据行对象            |

通过上面的步骤，即可订阅某个数据表的其中一个数据变化动作（新增、更新或删除）的变化，具体操作阅读以下内容。

## 订阅数据表

**请求示例**

```dart
// 订阅 tableName 为 'product' 的数据表的新增数据动作
Future subscribeEvent(eventType) async {
  String tableName = 'product';
  TableObject tableObject = new TableObject(tableName);

  try {
    WampSubscriber createEvent = await tableObject.subscribe(
      eventType,
      onInit: () {
        print('订阅成功==>');
      },
      onEvent: (result) {
        print('订阅推送==> $eventType');
        print(result.event);
      },
      onError: (error) {
        print('订阅断开==>');
        print(error.message);
        print(error.details);
      },
    );
  } catch (e) {
    print(e.toString());
  }
}
```

**返回示例**

onevent 回调函数中的 res 对象结构如下：

数据表新增数据（create）返回的对象结构：

```json
{
  "after": {
    "text": "123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265027,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "before": {},
  "event": "on_create",
  "schema_id": 968,
  "schema_name": "product",
  "id": "5f068dc32dc610747781efcc"
}
```

数据表更新数据（update）返回的对象结构：

```json
{
  "after": {
    "text": "123123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265113,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "before": {
    "text": "123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265027,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "event": "on_update",
  "schema_id": 968,
  "schema_name": "product",
  "id": "5f068dc32dc610747781efcc"
}
```

数据表删除数据（delete）返回的对象结构：

```json
{
  "after": {},
  "before": {
    "text": "123123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265113,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "event": "on_delete",
  "schema_id": 968,
  "schema_name": "product",
  "id": "5f068dc32dc610747781efcc"
}
```

err 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

> **info**
> 当 WebSocket 连接意外断开时，SDK 会采用指数退避算法的机制，自动尝试重连。

另外，在知晓云控制台中手动删除数据时，如需触发删除数据动作的订阅通知，需要勾上「删除动作触发触发器」设置，如下图

![删除数据触发 WebSocket](/images/websocket/dashboard-delete-data.png)

## 按查询条件订阅

> **info**
> 条件订阅使用方法与查询数据（Where）一致，可参考：[查询数据](/flutter-sdk/schema/query.md)。
> Websocket 按条件订阅目前仅支持比较（compare）查询。

按条件订阅支持以下操作符：

| 数据类型 |                            可使用的查询操作                                             | 说明 |
|:---------|:--------------------------------------------------------------------------------------- |:-----|
| string   | =, !=                                                                           | -    |
| integer  | =, >, >=, <, <=, !=                                                             | -    |
| number   | =, >, >=, <, <=, !=                                                             | -    |
| boolean  | =, !=                                                                           | -    |
| date     | =, >, >=, <, <=, !=                                                             | -    |


**请求示例**

```js
// 订阅 tableName 为 'product' 的数据表的新增数据动作
Future subscribeEvent(eventType) async {
  String tableName = 'product';
  TableObject tableObject = new TableObject(tableName);

  try {
    WampSubscriber createEvent = await tableObject.subscribe(
      eventType,
      onInit: () {
        print('订阅成功==>');
      },
      onEvent: (result) {
        print('订阅推送==> $eventType');
        print(result.event);
      },
      onError: (error) {
        print('订阅断开==>');
        print(error.message);
        print(error.details);
      },
      where: Where.compare('text', '=', 'hello'),
    );
  } catch (e) {
    print(e.toString());
  }
}
```

## 取消订阅

当实时数据库功能连接成功后，会一直保持订阅状态。如需断开连接，比如退出发起订阅的页面时，可根据需要主动发起取消订阅。

**请求示例**

```dart
createEvent.unsubscribe(); // 取消订阅上述示例中数据表的新增数据动作
```
