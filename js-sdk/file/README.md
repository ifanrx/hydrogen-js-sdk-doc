<!-- ex_nonav -->

# 文件

知晓云不仅在数据存储中允许你存储文件，同时也单独提供了文件存储功能，帮助你对多种类型媒体文件进行存储和管理。你可以在控制台上传、归类和删除文件，也可以通过 SDK 完成以上操作，以下是在小程序中调用微信的选择图片接口，用户选择好图片即可调用 ` wx.BaaS.uploadFile` 接口，将图片上传到知晓云服务器，你可以通过 SDK 其他文件接口来查找获取该文件

```js
wx.chooseImage({
  success: function(res) {
    let fileParams = {filePath: res.tempFilePaths[0]}
    wx.BaaS.uploadFile(fileParams)
  }
})
```

同时，知晓云提供能一个功能强大，但操作简单的图片处理功能，方便你对图片进行缩放、裁切、打水印等功能。如下，通过在图片 url 后面加上 `!/both/400x400` 即可缩放图片至 400x400 大小

![{{book.imgURLClipDemo}}]({{book.imgURLClipDemo}})

阅读以下章节，了解更多文件操作接口：

* [文件操作](./file.md)
* [文件分类操作](./category.md)