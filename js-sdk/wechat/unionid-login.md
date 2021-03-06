# 微信 unionid 登录

如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 `unionid` 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 `unionid` 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，`unionid` 是相同的。

这意味着，如果一个开发者在知晓云同时接入了小程序以及网站应用等多个平台，则可以通过 `unionid` 来进行不同平台下多个用户身份的统一。

考虑以下情况：若一个用户同时在小程序端以及网页端执行过登录操作，且该用户在小程序端使用 `openid` 登录机制进行登录，在网页端使用 `unionid` 登录机制进行登录，此时该用户将在当前应用 `_userprofile` 中存在两个不同的用户身份。此后若用户在小程序端使用 `unionid` 登录机制进行登录时，将由于 `openid` 唯一索引冲突的原因导致用户登录失败。此时，开发者应及时为该用户完成用户数据的合并。

针对上述情况，我们建议目前还未使用多平台或正在从单平台发展到多平台的开发者，在一开始就为用户进行 `unionid` 的绑定。同时针对单一平台应用，在此前使用 `openid` 登录机制，而后改用 `unionid` 登录机制的情况下，我们会为此前使用 `openid` 登录机制产生的用户自动进行 `unionid` 的绑定。

下面让我们简要了解一下知晓云的 `openid` 以及 `unionid` 登录机制设计。

> **info**
> 登录方法请查看 [微信登录](/js-sdk/wechat/signin-signout.md) 章节。

## OpenID 登录机制

> **info**
> sdk loginWithWechat 默认使用 `openid` 登录机制

知晓云使用 `openid` 字段为开发者提供 `openid` 登录机制的支持。当用户在小程序中使用 `openid` 机制进行登录时，接口中将根据 `openid` 定位用户，根据是否定位到对应用户，将出现以下两种情况：

- 无对应用户，此时将根据 `sdk` 中 `createUser` 参数的设置决定是否为其新建用户对象，若开发者选择新建用户对象，则会为其完成 `openid` 以及其余用户信息字段的设置，登录成功。
- 存在对应用户，则为其完成 `openid` 以及其余用户信息字段的设置，登录成功。

由于微信小程序登录与微信第三方授权登录获取到的用户 `openid` 是不同的，这个特性决定了 `openid` 登录机制下，不同登录方式将创建出不同的用户，无法使用统一用户进行登录。针对这种情况，开发者可以选择通过[已登录用户关联第三方平台账号](/js-sdk/web/signin-signout.html#已登录用户关联第三方平台账号)或[关联微信小程序](/js-sdk/wechat/signin-signout.html#关联微信小程序)的方式进行用户身份的统一。

当然，开发者可能更倾向于在调用登录接口时，就能成功完成用户身份的统一，即在微信小程序登录时，可以成功使用微信第三方授权登录创建的用户进行登录，反之亦然。为此，知晓云为开发者提供了 `unionid` 登录机制的支持，`unionid` 的统一性使得用户在不同登录方式下可以使用统一用户身份完成登录流程。

## UnionID 登录机制

> **info**
> 若小程序已在微信开放平台进行绑定，开发者调用 wx.login 接口获取的登录凭证可直接用于换取 `unionid`。

知晓云使用 `_provider.wechat_unionid` 字段为开发者提供 `unionid` 登录机制的支持。当用户在小程序中使用 `unionid` 机制进行登录时，可能遇到以下几种情况：

- **当前用户此前未在知晓云完成过小程序登录/微信第三方授权登录**，则在用户执行小程序登录时，将根据 `sdk` 中 `createUser` 参数的设置决定是否为其新建用户对象。若开发者选择新建用户对象，则会为其完成 `_provider.wechat_unionid` 以及 `openid` 字段的设置，登录成功。
- **当前用户此前在知晓云通过 `openid` 登录机制完成过小程序登录，未执行过微信第三方授权登录，或完成微信第三方授权登录时未进行 `_provider.wechat_unionid` 的绑定**，此时小程序登录接口中由于 `_provider.wechat_unionid` 未定位到对应用户，将退而求其次根据 `openid` 进行用户定位，此时可能出现以下情况：
  - 若用户此时 `_provider.wechat_unionid` 值为空，则为其进行赋值操作，登录成功。
  - 若用户此时 `_provider.wechat_unionid` 值不为空，则认为开发者小程序绑定的开放平台账号变更，此时用户登录接口调用失败，开发者需要检查小程序绑定的开放平台账号是否正确。
- **当前用户此前在知晓云执行过微信第三方授权登录，且完成了 `_provider.wechat_unionid` 的绑定，但未执行过小程序登录**，则在用户执行小程序登录时，将根据 `_provider.wechat_unionid` 定位到此前微信第三方授权登录创建的用户，并为其进行 `openid` 的设置，登录成功。
- **当前用户此前在知晓云通过 `openid` 登录机制完成过小程序登录，且在知晓云执行过微信第三方授权登录并完成了 `_provider.wechat_unionid` 的绑定**，此时将根据 `_provider.wechat_unionid` 定位到此前微信第三方授权登录创建的用户，但在进行 `openid` 的设置时会由于 `openid` 唯一索引冲突导致设置失败，此时用户登录接口调用失败，需要开发者进行用户数据合并。

## 用户数据合并

由于 `openid` 以及 `_provider.wechat_unionid` 唯一索引的限制，用户在使用 `unionid` 登录机制进行登录时可能出现需要 merge user 的情况，此时开发者可根据错误信息中的 `openid` 以及 `unionid` 值定位用户进行数据合并处理。用户可以选择多种方式进行用户数据的合并，比如在控制台直接进行用户相关数据的删除，亦或者编写云函数进行用户数据的合并后再进行用户的删除等等。这里列出几点合并用户数据时的注意事项：

- 当前应用的数据表中，是否存在 `created_by` 为待合并用户的数据？
- 当前应用的数据表中，是否存在 `user_id` 类型的字段，且其字段值为待合并用户的 `user_id`？
- 当前应用的数据表中，是否存在 `object/array` 类型字段，且字段值中包含待合并用户的 `user_id`？
- 当前应用的数据表中，是否存在 `pointer` 字段指向待合并用户？

若以上几点答案均为否，则开发者只需进行 `_userprofile` 表中用户数据的处理即可，否则开发者还应考虑其余数据表中对应用户数据的合并问题。

一般而言，开发者可能根据以下几种策略进行用户数据的合并：

- 合并 `_userprofile` 表中的用户数据，择一用户进行保留，并保留其余数据表中待合并用户相关数据创建时间最新/最老的一条，舍弃最老/最新的数据，同时更新其 `user_id` 相关字段值为保留用户的 `user_id`
- 合并 `_userprofile` 表中的用户数据，择一用户进行保留，同时其余数据表中只保留该用户的用户数据，舍弃另一用户的相关数据
- 若无法简单地判断如何进行数据取舍，则可以编写云函数，在云函数中自己设置规则进行用户数据的合并

在进行数据合并处理时，开发者还应注意查看字段是否存在唯一索引，防止由于唯一索引冲突导致合并处理失败。

由于此前知晓云微信小程序登录只支持通过 `openid` 机制进行登录，所以若用户此前已通过 `openid` 机制完成小程序登录，并在微信第三方授权登录时完成了 `_provider.wechat_unionid` 的绑定，则此后该用户在微信小程序登录中使用 `unionid` 机制进行登录时，会面临需要进行用户数据合并的情况。

针对这类型用户，在此前用户通过 `openid` 机制进行登录时，若用户已授权开发者获取其用户信息，则会为其进行 `unionid` 字段值的设置，所以开发者可比对不同用户间的 `_provider.wechat_unionid` 值与 `unionid` 值是否相同，若相同，则说明两者应为 `unionid` 登录机制下的同一用户，开发者可预先通过云函数等方式为其进行数据合并。
