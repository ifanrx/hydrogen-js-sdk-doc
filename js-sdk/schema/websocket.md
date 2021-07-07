# 实时数据库（WebSocket）

该功能可实现订阅数据表的数据增删改变化，当表数据改变时，小程序端可以实时接收到数据的变化。

> **danger**
> 该操作适用于 SDK version >= v3.14.0-beta.2
> 京东小程序暂不支持

## 操作步骤

> **info**
> 使用实时数据库功能前需要先进行[登录操作](/js-sdk/auth.md#登录)

1.通过 `tableName` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

{% ifanrxCodeTabs %}
`let MyTableObject = new wx.BaaS.TableObject(tableName)`
{% endifanrxCodeTabs %}

**参数说明**

| 名称     | 类型   | 必填   | 说明                   |
| :-----  | :----- | :---- | :--- |
| tableName | String |  是 | 数据表名 |

> **info**
> 实时数据库功能无法订阅内置数据表，如 _userprofile 表、_richtextcontent 表等

2.发起数据表订阅操作

`let myEvent = MyTableObject.subscribe(event, callbackObj)`

**参数说明**

| 名称     | 类型   | 必填   | 说明                                          |
| :-----  | :----- | :---- | :--- |
| event    | String | 是  | 表数据变化的类型，有三种：create、update 和 delete    |
| callbackObj | Object |  是 | 回调函数对象，包含三个回调函数：oninit、onevent 和 onerror |

> **info**
>
> - `create`、`update` 和 `delete` 三种数据变化类型需要分别订阅
> - `oninit` 回调函数将在订阅动作初始化成功时调用，一次 subscribe 订阅动作会触发一次
> - `onevent` 回调函数将在数据表每次有相应动作变化时调用，参数是数据表变化了的数据项，三种事件类型对应得到的回调参数对象结构见下表
> - `onerror` 回调函数将在订阅动作出错是调用，参数是错误信息

**onevent 回调函数参数说明**

`create` 事件类型得到的对象：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_create"   |
| schema_id   | Number  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 新增的数据行的 ID            |
| after       | Object  | 新增的数据行对象              |
| before      | Object  | 空对象                      |

`update` 事件类型得到的对象：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_update"   |
| schema_id   | Number  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 更新的数据行的 ID            |
| after       | Object  | 更新后的数据行对象            |
| before      | Object  | 更新前的数据行对象            |

`delete` 事件类型得到的对象：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_delete"   |
| schema_id   | Number  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 删除的数据行的 ID            |
| after       | Object  | 空对象                      |
| before      | Object  | 删除前的数据行对象            |

通过上面的步骤，即可订阅某个数据表的其中一个数据变化动作（新增、更新或删除）的变化，具体操作阅读以下内容。

## 订阅数据表

**请求示例**

{% ifanrxCodeTabs %}

```js
// 订阅 tableName 为 'product' 的数据表的新增数据动作
const tableName = 'product'
const Product = new wx.BaaS.TableObject(tableName)
const event = 'create' // create、update 或 delete
let createEvent = Product.subscribe(event, {
  oninit: () => {
    console.log(`订阅成功==>`)
  },
  onevent: res => {
    console.log(`订阅推送==>`, res)
  },
  onerror: err => {
    console.log(`订阅断开==>`, err)
  },
})
```

{% endifanrxCodeTabs %}

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

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

> **info**
> 当 WebSocket 连接意外断开时，SDK 会采用指数退避算法的机制，自动尝试重连。

<!-- 分隔两个 info -->
> **info**
> 3.15.2 及以上版本用户未登录时不再主动尝试重连。

另外，在知晓云控制台中手动删除数据时，如需触发删除数据动作的订阅通知，需要勾上「删除动作触发触发器」设置，如下图

![删除数据触发 WebSocket](/images/websocket/dashboard-delete-data.png)

## 按查询条件订阅

> **info**
> 条件订阅使用方法与查询数据（Query）一致，可参考：[查询数据](/js-sdk/schema/query.md)。
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

{% ifanrxCodeTabs %}

```js
// 订阅 tableName 为 'product' 的数据表的新增数据动作
const tableName = 'product'
const Product = new wx.BaaS.TableObject(tableName)
const event = 'create' // create、update 或 delete

// 实例化查询对象
let query = new wx.BaaS.Query()

// 设置查询条件（如比较）
query.compare('key', '=', 'sample')

// 应用查询对象
let createEvent = Product.setQuery(query).subscribe(event, {
  oninit: () => {
    console.log(`订阅成功==>`)
  },
  onevent: res => {
    console.log(`订阅推送==>`, res)
  },
  onerror: err => {
    console.log(`订阅断开==>`, err)
  },
})
```

{% endifanrxCodeTabs %}

## 取消订阅

当实时数据库功能连接成功后，会一直保持订阅状态。如需断开连接，比如退出发起订阅的页面时，可根据需要主动发起取消订阅。

**请求示例**

```js
createEvent.unsubscribe() // 取消订阅上述示例中数据表的新增数据动作
```

## 实时数据库微信小程序 Demo

下面，我们以**视频弹幕**微信小程序 Demo 为示例，展示实时数据库功能在实际开发中的使用。

<div class="index-doc-header-video">
  <video src="https://cloud-minapp-287.cloud.ifanrusercontent.com/1k629eQfaH5BtJ6h.mp4" poster="https://cloud-minapp-287.cloud.ifanrusercontent.com/1k62WXZqwI0GkCjv.png" controls="controls" playsinline=""></video>
</div>

### 1、知晓云的初始化配置

首先，打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=201822)，将先前下载好的[演示 demo](https://github.com/ifanrx/hydrogen-demo.git) 的 `websocket-demo-danmu` 文件夹添加入小程序项目中。

![创建小程序项目](/images/websocket/minapp-creation.png)

其中 `AppID` 为小程序的 ID，在微信小程序后台**设置 >> 开发设置** 中可获取，知晓云也在[**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/app/)提供了快速通道获取小程序 ID。

![开发者 ID](/images/newbies/developer-id.png)

#### 在 app.json 中加入插件的引用声明

<pre>
<code class="lang-js">
"plugins": {
  "sdkPlugin": {
    "version": "{{ book.latestVersionWechatPlugin }}",
    "provider": "wxc6b86e382a1e3294"
  }
} 
</code>
</pre>

##### 在 app.js 文件中完成 SDK 的初始化

通过初始化 [SDK](/js-sdk/download-sdk.md)，知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 [SDK](/js-sdk/download-sdk.md) 提供的全部功能。

在知晓云后台 - [**设置模块的小程序面板**](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)，可获取要接入知晓云服务的小程序 `ClientID`, 按照如下方式进行 [SDK](/js-sdk/download-sdk.md) 初始化:

![复制 clientID](/images/newbies/get-client-id.png)

```js
// app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    let clientID = '[[client_id]]'  // 应用名称: [[app_name]]
    wx.BaaS.init(clientID)
  }
})
    
```

### 2、创建数据表

完成知晓云的初始化配置后，开发者就可以根据自身应用的业务逻辑，确定所需的数据表，确定好后即可在**知晓云后台 >> 数据管理模块**开始数据表的创建工作。

以**我的书架**为例，在数据管理模块，创建一张名为 `danmu_list` 的数据表，并添加名为 `text` 和 `time` 的两个数据列。

`danmu_list` 数据表自定义字段：

| 名称        | 类型     | 说明                        |
| :-----      | :---    | :---    |
| text        | String  | 弹幕内容                    |
| time        | Integer | 弹幕在视频中出现的时间         |

![创建表](/images/websocket/table-creation.png)

![添加列](/images/websocket/column-addition.png)

### 3、SDK 实时数据库使用示例

完成数据表的创建后，我们现在就可以使用知晓云的实时数据库功能，对数据进行订阅操作。

**订阅弹幕列表数据表的数据变化（核心代码）**

```js
// pages/index.js
Page({
  subscribeEvent: null,
  inputValue: '',
  videoCurTime: 0,
  data: {
    danmuList: [],
  },

  onLoad() {
    // 先进行静默登录
    wx.BaaS.auth.loginWithWechat().then(() => {
      this.getDanmuList()
      this.subscribeDanmuList()
    })
  },

  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  onUnload() {
    // 取消表订阅
    if (this.subscribeEvent.unsubscribe) this.subscribeEvent.unsubscribe()
  },

  getDanmuList() {
    utils.getDanmuList().then(res => {
      let danmuList = res.data.objects.map(item => {
        return {
          text: item.text,
          time: item.time,
          color: getRandomColor(),
        }
      })
      this.setData({
        danmuList,
      })
    })
  },

  // 订阅 danmu_list 新增数据事件
  subscribeDanmuList() {
    let danmuListTable = new wx.BaaS.TableObject(app.globalData.tableName)
    this.subscribeEvent = danmuListTable.subscribe('create', {
      oninit: () => {
        console.log(`create 订阅成功==>`)
      },
      onevent: etv => {
        console.log(`create 订阅推送==>`, etv)
        // 实时获取到新增的数据行，发送弹幕
        this.videoContext.sendDanmu({
          text: etv.after.text,
          color: getRandomColor(),
        })
      },
      onerror: err => {
        console.log(`create 订阅断开==>`, err)
      },
    })
  },

  // ...
})
```

> **info**
> 注意，上述代码只包含核心逻辑部分，可能和 `websocket-demo-danmu` 源码有一定的差异，但是代码的逻辑和接口的调用方式基本上是一样。

我们可以在微信开发者工具看到小程序界面，输入弹幕内容，点击发送弹幕为数据表新增一条弹幕数据，小程序端即可收到新增的数据行，并进行弹幕显示。

![弹幕小程序界面](/images/websocket/demo.jpg)

至于小程序视频弹幕功能详细的实现细节，这里就不再赘述，详见[**演示 demo**](https://github.com/ifanrx/hydrogen-demo.git) `websocket-demo-danmu` 文件夹的源码。

此外，我们还提供了「我的书架」微信小程序 Demo 站内信版（`hello-world-websocket`），在[新手入门](/newbies/wechat.md)章节中的「我的书架」小程序 Demo 的基础上使用了实时数据库功能实现站内信功能，同样可以到[**演示 demo**](https://github.com/ifanrx/hydrogen-demo.git)的 `hello-world-websocket` 文件夹查看。
