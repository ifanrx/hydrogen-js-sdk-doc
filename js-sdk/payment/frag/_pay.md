<!-- ex_nonav -->
{% if apiPrefix == 'wx' %}
{% set platformName = "微信" %}
# 微信支付
{% elif apiPrefix == 'my' %}
{% set platformName = "支付宝" %}
# 支付宝支付
{% endif %}

`{{apiPrefix}}.BaaS.pay(OBJECT)`

**OBJECT 参数说明**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| totalCost              | Number  | Y   | 支付总额，单位：元 |
| merchandiseDescription | String  | Y   | {{platformName}}支付凭证-商品详情的内容 |
| merchandiseSchemaID    | Integer | N   | 商品数据表 ID，可用于定位用户购买的物品 |
| merchandiseRecordID    | String  | N   | 商品数据行 ID，可用于定位用户购买的物品 |
| merchandiseSnapshot    | Object  | N   | 根据业务需求自定义的数据 |

> **info**
> 举例：开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 `merchandiseSchemaID`, 文章记录的 ID 作为你 `merchandiseRecordID` 传入到 `{{apiPrefix}}.BaaS.pay(object)` 写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaID`, `merchandiseRecordID` 来查询用户是否付费。

**支付成功返回参数说明**

{% if apiPrefix == 'wx' %}
| 参数                      | 类型   | 说明 |
| :-------------------------| :----- | :-- |
| errMsg | String   | 微信支付状态信息 |
| transaction_no | String   | 微信支付流水号 |
| trade_no    | String | 微信支付交易 ID, 业务方在微信后台对账时可看到此字段 |
{% elif apiPrefix == 'my' %}
| 参数                      | 类型   | 说明 |
| :-------------------------| :----- | :-- |
| resultCode | String   | 支付宝支付状态码 |
| transaction_no | String   | 支付宝支付流水号 |
| trade_no    | String | 支付宝支付交易 ID, 业务方在支付宝后台对账时可看到此字段 |

> **info**
> `resultCode`是支付宝返回的状态码，
`resultCode: '9000'` 为支付成功，`resultCode: '8000'` 为正在处理中，
具体以知晓云后台支付订单的状态为准。请参考[订单查询接口文档](/js-sdk/payment/order.md)。
{% else %}
{% endif %}

**示例代码**

```js
// 支付示例代码
let params = {
  totalCost: 0.1,
  merchandiseDescription: '深蓝色秋裤'
}

{{apiPrefix}}.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应，可以在 res 中拿到 transaction_no 和支付结果信息
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```

**支付成功返回示例**

{% if apiPrefix == 'wx' %}
```
{
  errMsg: "requestPayment:ok",
  transaction_no: "MDUhtNmacdYBKokJbCXhvYuoJnHXzpeN",
  trade_no: '4DySOWgNssfu5XsiTH9Ek2f5m9jWTwTw'
}
```

{% elif apiPrefix == 'my' %}

```
{
  resultCode: '9000',
  transaction_no: 'Q6lgbKPmNlGXKbfcHGuWiT0KeksLSZvC',
  trade_no: '4DySOWgNssfu5XsiTH9Ek2f5m9jWTwTw'
}
```

{% else %}
{% endif %}

为了方便开发者清楚区分用户取消支付还是支付失败，我们为其增加了错误类型，你可以通过像以下操作，对支付状态进行判断：

{% if apiPrefix == 'wx' %}

```js
wx.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应。
}, err => {
  // HError 对象
  if (err.code === 603) {
    console.log('用户尚未授权')
  } else if (err.code === 607) {
    console.log('用户取消支付')
  } else if (err.code === 608){
    console.log(err.message)
  }
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

**接口说明**

![小程序支付模式图-来自微信官方](https://pay.weixin.qq.com/wiki/doc/api/img/wxa-7-2.jpg)

`wx.BaaS.pay(object)` 实际上做了发起支付统一下单请求，及调用 `wx.requestPayment()` 接口等操作。开发者只需要调用 `wx.BaaS.pay(object)` , 传入必填参数即可发起微信支付。用户感知到的现象就是, 点击付款按钮，弹出支付弹框, 要求用户输入密码, 用户输入正确的密码后完成支付流程, 停在支付结果页。用户可在支付结果页点击返回商家按钮回到支付前界面。

{% elif apiPrefix == 'my' %}

```js
my.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应。
}, err => {
  // PayError 对象
  console.log(err.code, err.message)
})
```

PayError 对象结构请参考 [PayError 错误码详解](#payerror-错误码详解（仅支付宝）)

**接口说明**

![小程序支付模式图-来自支付宝官方](https://gw.alipayobjects.com/zos/skylark-tools/public/files/c2f99fbcfd5fcad87ff9ad27ce8f8197.png)

`my.BaaS.pay(object)` 实际上做了发起支付统一下单请求，及调用 `my.tradePay()` 接口等操作。开发者只需要调用 `my.BaaS.pay(object)` , 传入必填参数即可发起支付宝支付。用户感知到的现象就是, 点击付款按钮，弹出支付弹框, 要求用户输入密码, 用户输入正确的密码后完成支付流程, 停在支付结果页。用户可在支付结果页点击返回商家按钮回到支付前界面。

### PayError 错误码详解（仅支付宝）

支付错误状态码与[支付宝小程序支付接口的状态码](https://docs.alipay.com/mini/api/openapi-pay)一致。

错误码对应的错误信息如下：

`'4000'`  订单支付失败

`'6001'`  用户中途取消

`'6002'`  网络连接出错

`'6004'`  支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态

`'99'`  用户点击忘记密码导致快捷界面退出（only iOS）

{% else %}
{% endif %}
