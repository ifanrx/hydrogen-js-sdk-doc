# 获取数据项详情

## 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
// 通过 tableId 创建数据表实例 
let table = Table(Id: 1236**)

// 通过 tablename 创建数据表实例
let table = Table(name: "Book")
```
{% content "oc1" %}
```
// 通过 tableId 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initWithId:1236**];

// 通过 tablename 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initWithName:@"Book"];
```
{% endtabs %}

**参数说明**

tableName 和 tableID 二选一

| 名称     | 类型   |  说明                   |
| :-----  | :----- | :--- |
| tableId   | Int  | 数据表的 ID             |
| tableName | String | 数据表名 |

2.指定 `recordId` 执行获取相应数据项操作

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
table.get("5c944a22d575a970a9b91c13") { (record, error) in

}
```
{% content "oc2" %}
```
[_table get:@"5ca47715d625d83705971cec" query:nil completion:^(BaaSTableRecord * _Nullable record, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordId | String | Y  | 记录 ID |
| query | Query |  N  | 过滤条件 |

**返回结果**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| record   | TableRecord     | 数据项实例 |
| error     | HError         | 错误信息   |

常见错误：

| 错误码            | 可能的原因      |
|----------------|-----------------|
| 404            | 数据行不存在      |

## 字段过滤与扩展

请参考[字段过滤与扩展](./select-and-expand.md)章节