# 数据导入导出操作

数据的导入、导出任务一旦成功建立，结果将以邮件的形式发送到企业创建者的邮箱中。

通过 `数据表 ID` 实例化一个 `TableObject` 对象，以下操作都是在该对象上进行操作：

`let MyTableObject = new BaaS.TableObject(tableID)`

**参数说明**

| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableID   | integer | 数据表的 ID                          |

## 数据导出

`MyTableObject.exportData(fileType, mode, start, end)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :-----   | :-----  | :-- | :---|
| fileType | String  |  是 | 导出文件的格式，支持 csv、json、xlsx 格式 |
| mode     | String  |  是  | 导出任务的模式|
| start    | Integer / Date / String |  否  | 导出部分数据的起始时间 |
| end      | Integer / Date / String |  否  | 导出部分数据的结束时间 |

导出任务支持两种模式：

|    值   |    说明      |
| :-----  | :---------  |
| all     |  导出全部数据 |
| part    |  导出部分数据 |

**示例代码**
{% tabs exportDataAsync="async/await", exportDataPromise="promise" %}
{% content "exportDataAsync" %}
```js
async function exportData() {
  try {
    let MyTableObject = new BaaS.TableObject(tableID)
    let res = await MyTableObject.exportData('json', 'all')
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "exportDataPromise" %}
```js
function exportData() {
  let MyTableObject = new BaaS.TableObject(tableID)
  MyTableObject.exportData('json', 'all').then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例** (res.status === 200)

res.data:
```js
{
  "status": "ok"
}
```


## 数据导入

`MyTableObject.importData({dataFileUrl, dataFilePath}, fileType)`

**参数说明**

| 参数         | 类型     | 必填 | 说明 |
| :-----      | :-----  | :-- | :---|
| dataFileUrl | String  |  否  | 准备导入的备份数据 url （dataFileUrl 与 dataFile 两者必须指定一个） |
| dataFile    | String / Buffer |  否  | 文件路径（目前仅支持沙箱环境的 tmp 目录） / 文件 Buffer |
| fileType    | String  |  是 | 导入文件的格式，支持 csv、json、xlsx 格式 |

**示例代码**
{% tabs importDataAsync="async/await", importDataPromise="promise" %}
{% content "importDataAsync" %}
```js
async function importData() {
  try {
    /* url */
    let MyTableObject = new BaaS.TableObject(tableID)
    let res = await MyTableObject.importData({dataFileUrl: dataUrl}, 'csv')
    // success

    /* 本地文件路径 */
    const fs = require('fs')
    const file = fs.createWriteStream('/tmp/data.csv')
    let res = await BaaS.request.get(dataUrl)
    file.write(res.data)
    file.end()
    let MyTable = new BaaS.TableObject(tableID)
    let importRes = await MyTable.importData({dataFile: '/tmp/data.csv'}, 'csv')
    // success
    return res

    /* Buffer */
    let res = await BaaS.request.get(dataUrl)
    let MyTable = new BaaS.TableObject(tableID)
    let importRes = await MyTable.importData({dataFile: Buffer.from(res.data)}, 'csv')
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "importDataPromise" %}
```js
function importData() {
  /* url */
  let MyTableObject = new BaaS.TableObject(tableID)
  MyTableObject.importData({dataFileUrl: dataUrl}, 'csv').then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })

  /* 本地文件路径 */
  const fs = require('fs')
  const file = fs.createWriteStream('/tmp/data.csv')
  BaaS.request.get(dataUrl).then(res => {
    file.write(res.data)
    file.end()
    let MyTable = new BaaS.TableObject(tableID)
    MyTable.importData({dataFile: '/tmp/data.csv'}, 'csv').then(res => {
      // success
      callback(null, res)
    }).catch(err => {
    // error
    callback(err)
    })
  })

  /* Buffer */
  BaaS.request.get(dataUrl).then(res => {
    let MyTable = new BaaS.TableObject(tableID)
    MyTable.importData({dataFile: Buffer.from(res.data)}, 'csv').then(res => {
      // success
      callback(null, res)
    }).catch(err => {
    // error
    callback(err)
    })
  })
}
```
{% endtabs %}

**返回示例** (res.status === 200)

res.data:
```js
{
  "status": "ok"
}
```

## 获取单个导出任务信息

```
MyTableObject.getExportTask(jobID)
```

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :-----   | :-----  | :-- | :---|
| jobID | String  |  是 | 建立导出任务时返回的 job_id |

**返回参数说明**

| 字段名称 | 类型 | 说明 |
| :-----  | :----- | :-- |
| job_id | String | 导出任务 ID |
| status | String | 任务状态，等待处理：pending、正在处理：ready、已完成：finish |
| operation | String | 操作类型，固定为：export | 
| file_name | String | 文件名 |
| file_type | String | 文件类型 | 
| download_url | String | 下载链接 |
| created_at | Integer | 任务创建时间戳 |
| updated_at | Integer | 最近一次任务更新时间戳 |

**代码示例**
```js
async function getExportTask() {
  try {
    let MyTableObject = new BaaS.TableObject(tableID)
    let res = await MyTableObject.getExportTask('RcnyXjPH8zLSsUYrIlPsG5qnBERYFrGF')
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

**返回示例**

```json
{
  "created_at": 1574405175,
  "download_url": null,
  "file_name": null,
  "file_type": "json",
  "job_id": "RcnyXjPH8zLSsUYrIlPsG5qnBERYFrGF",
  "operation": "export",
  "status": "pending",
  "updated_at": 1574405175
}
```

**状态码说明**

`200`: 成功

`404`: 找不到 job_id 对应的任务

## 批量获取导出任务信息

```
MyTableObject.getExportTasks()
```

**代码示例**
```js
async function getExportTasks() {
  try {
    let MyTableObject = new BaaS.TableObject(tableID)
    let res = await MyTableObject.getExportTasks()
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

**返回示例**

```json
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "created_at": 1574405175,
      "download_url": null,
      "file_name": null,
      "file_type": "json",
      "job_id": "RcnyXjPH8zLSsUYrIlPsG5qnBERYFrGF",
      "operation": "export",
      "status": "pending",
      "updated_at": 1574405175
    }
  ]
}
```

**状态码说明**

`200`: 成功
