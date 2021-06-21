<!-- ex_nonav -->
# 微信支付 

`WechatComponent.pay(WechatOrder order, int requestCode, Activity activity)`

**WechatOrder 字段说明**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| totalCost              | float   | Y   | 支付总额，单位：元 |
| merchandiseDescription | String  | Y   | 微信支付凭证-商品详情的内容 |
| merchandiseSchemaId    | String  | N   | 商品数据表 ID，可用于定位用户购买的物品 |
| merchandiseRecordId    | String  | N   | 商品数据行 ID，可用于定位用户购买的物品 |
| merchandiseSnapshot    | Object  | N   | 根据业务需求自定义的数据 |
| profitSharing          | Boolean | N   | 当前订单是否需要分账。分账操作，请查看[微信直连商户分账](/cloud-function/node-sdk/order.html#微信直连商户分账) |

> **info**
> 分账功能仅商用版及商用版以上版本可以使用。

<!-- 分隔两个 info -->

> **info**
> 举例：开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 `merchandiseSchemaId`, 文章记录的 ID 作为你 `merchandiseRecordId` 传入到 `WechatComponent.pay(...)` 写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaId`, `merchandiseRecordId` 来查询用户是否付费。

**返回参数说明**

| 参数                      | 类型   | 说明 |
| :-------------------------| :----- | :-- |
| exception | Exception   | 支付过程中发生异常（非用户主动取消） |
| orderInfo | WechatOrderResp   | 后台成功创建的预付单 |
| payResp    | PayResp | 如果微信 sdk 返回了信息，则保存在这里 |


**示例代码**

```java
// 发起一次 398 元的支付请求
WechatComponent.pay(new WechatOrder(398f, "知晓云充值-微信支付"), SEND_WX_ORDER, this);

// 此 api 会打开对应的透明页面，并在此透明页面里与服务端通讯和拉起支付页面
// 在 onActivityResult 里接收支付结果
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    switch (requestCode) {
        case SEND_WX_ORDER:
            if (resultCode == RESULT_OK) {
                WechatOrderResult result = WechatComponent.getOrderResultFromData(data);

                // 支付失败了，这里拿到异常，做日志，并提示用户
                if (result.getException() != null) {
                    result.getException();
                } else {

                    // 支付成功，这里可以拿到知晓云服务端返回的信息，以及微信 app 返回的原始信息以供查验
                    result.getOrderInfo();
                    result.getPayResp();
                }
            } else {

                // 用户取消了支付
            }
            break;
    }
}
```

**支付成功知晓云服务端返回示例（WechatOrderResp）**

```json
{
      "appid": "wx4b3c1aff4c5389f5",
      "noncestr": "1i0H34lIcvRCOKj3PqqJJvBW9GAZZlQu",
      "package": "Sign\u003dWXPay",
      "partnerid": "1488522312",
      "prepayid": "wx211112349689781031d1fba61664632900",
      "sign": "0002B59A1314F60158989088E68B0D4B",
      "timestamp": "1566357154",
      "trade_no": "1i0H346yszNaceD5efLzlAizmA7zlIb6",
      "transaction_no": "wM6Oy0VjDvpOPa5mR7dtuWmjia7NFcxZ"
    }
```


**接口说明**

![支付模式图-来自微信官方](https://pay.weixin.qq.com/wiki/doc/api/img/chapter8_3_1.png)

`WechatComponent.pay(...)` 实际上做了发起支付统一下单请求，及拉起微信支付页面等操作。开发者只需要调用 `WechatComponent.pay(...)` , 传入必填参数即可发起微信支付。用户感知到的现象就是, 点击付款按钮，弹出支付弹框, 要求用户输入密码, 用户输入正确的密码后完成支付流程, 停在支付结果页。用户可在支付结果页点击返回商家按钮回到支付前界面。


