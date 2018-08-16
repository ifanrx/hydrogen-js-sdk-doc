# 编辑器

表格编辑器类，提供了获取内容、设置内容、操作表格的方法。

## 构造函数

- 用法

  ```js
  new shimo.sdk.sheet.Editor();
  new shimo.sdk.sheet.Editor(options);
  ```

- 参数

| 名称                                | 类型      | 默认值 | 描述                              |
| ----------------------------------- | --------- | ------ | --------------------------------- |
| `options.editable`                  | `Boolean` | `true` | 设置表格是否只读                  |
| `options.commentable`               | `Boolean` | `true` | 是否允许单元格评论                |
| `options.disableRenderOptimization` | `Boolean` | `true` | 是否禁用表格渲染优化              |
| `options.uploadConfig`              | `Object`  | 可选   | 上传图片配置                      |
| `options.uploadConfig.origin`       | `String`  | 必选   | 上传服务的地址                    |
| `options.uploadConfig.server`       | `String`  | 必选   | 存储服务类型, eg, 'qinniu', 'aws' |
| `options.uploadConfig.token`        | `String`  | 必选   | 上传服务鉴权秘钥                  |
| `options.downloadConfig`            | `Object`  | 可选   | 下载图片配置                      |
| `options.downloadConfig.origin`     | `String`  | 必选   | 下载服务的地址                    |

## 属性列表

| 名称         | 类型      | 描述                    |
| ------------ | --------- | ----------------------- |
| `isRendered` | `Boolean` | 表格是否渲染成功        |
| `spread`     | Spread    | [工作簿实例](spread.md) |

## 方法列表

### render

渲染表格。

- 返回 `undefined`
- 用法 `render(options)`
- 参数

| 名称                | 类型          | 默认值 | 描述         |
| ------------------- | ------------- | ------ | ------------ |
| `options.content`   | `string`      | 无     | 表格内容     |
| `options.container` | `HTMLElement` | 无     | 表格渲染容器 |

### getContent

获取表格内容。

- 返回 `Promise<string>`
- 用法

```js
editor.getContent().then(function(content) {
  console.log(content);
});
```

### setContent

设置表格内容。

- 返回 `undefined`
- 用法 `setContent(content, activeSheetId)`
- 参数

| 名称            | 类型     | 默认值 | 描述                      |
| --------------- | -------- | ------ | ------------------------- |
| `content`       | `String` | 无     | 表格内容                  |
| `activeSheetId` | `String` | 无     | 设置表格先渲染的工作表 ID |

### destroy

销毁表格编辑器实例。

- 返回 `undefined`
- 用法 `destroy()`
- 参数

### undo

撤销上一步操作。

- 返回 `Promise<undefined>`
- 用法

```js
editor.undo().then(function() {
  console.log("undo successed!");
});
```

- 参数

### redo

重新应用上一步操作。

- 返回 `Promise<undefined>`
- 用法

```js
editor.redo().then(function() {
  console.log("redo successed!");
});
```

- 参数