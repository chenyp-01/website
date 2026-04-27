# 1. Element-plus上传组件实现导入excel
## 安装依赖包 
```
// 参考版本 "xlsx": "^0.18.5"
npm i xlsx
```
## utils/readFile.js 

** 这个文件不要改动

读取二进制文件 
```javascript
/* 读取文件 */
export const readFile = (file) => {
    return new Promise(resolve => {
        // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
        let reader = new FileReader()
        // 该方法用于将File对象转化为二进制文件
        reader.readAsBinaryString(file)
        // 当把文件所有数据加载完毕后，把数据传给promise的下一步
        reader.onload = ev => {
            resolve(ev.target.result)
        }
    })
}
```
```vue
<!--
import * as XLSX from "xlsx";

//把json数据导出到excel文件中
export function export_excel(excelData, fileName) {
  // 将数据写入表格中
  const data = XLSX.utils.json_to_sheet(excelData);
  // 创建工作簿
  const wb = XLSX.utils.book_new();
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, "data");
  // 生成文件并下载
  XLSX.writeFile(wb, fileName + ".xlsx");
}
//把英文表头换为中文
export function convert_excel_data(excelData, tHeader) {
  return excelData.map((item) => {
    const obj = {};
    for (const k in item) {
      if (tHeader[k]) {
        obj[tHeader[k]] = item[k];
      }
    }
    return obj;
  });
}

-->
```



## 使用element-plus 编写一个上传页面

```vue
<script setup>
import * as xlsx from "xlsx"
import { readFile } from "@/utils/readFile.js";
import { ref } from 'vue'
const tableData = ref([])

const onChange = async (file) => {
    // 获取上传excel的文件数据
    let dataBinary = await readFile(file.raw);
    // 获取工作簿对象
    let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
    // 获取第一个工作表的数据
    let workSheet = workBook.Sheets[workBook.SheetNames[0]];
    // 把工作表数据转为json
    const data = xlsx.utils.sheet_to_json(workSheet);
    console.log('data', data);
    //把json传给tableData
    tableData.value = data;
}
</script>

<template>
    <div class="more-lang">
        <!-- 
            注意：
                1. action为空
                2. 添加 :auto-upload="false" ,阻止自动上传
                3. 事件监听 on-change
         -->
        <el-upload class="upload-demo" action='' :auto-upload="false" :on-change="onChange">
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500KB.
                </div>
            </template>
        </el-upload>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
            <el-table-column prop="score" label="分数"> </el-table-column>
        </el-table>
    </div>
</template>

<style lang="scss" scoped></style>
```
# 2. 把json数据导出为excel文件
## 创建导出excel的工具函数
src/utils/exportExcel.js

以下工具函数不要改动

```javascript
import * as XLSX from "xlsx";

//把json数据导出到excel文件中
export function export_excel(excelData, fileName) {
  // 将数据写入表格中
  const data = XLSX.utils.json_to_sheet(excelData);
  // 创建工作簿
  const wb = XLSX.utils.book_new();
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, "data");
  // 生成文件并下载
  XLSX.writeFile(wb, fileName + ".xlsx");
}
//把英文表头换为中文
export function convert_excel_data(excelData, tHeader) {
  return excelData.map((item) => {
    const obj = {};
    for (const k in item) {
      if (tHeader[k]) {
        obj[tHeader[k]] = item[k];
      }
    }
    return obj;
  });
}

```
## 导出excel的完整组件代码
```vue
<script setup>
import { convert_excel_data,export_excel } from "@/utils/exportExcel.js";

//导出Excel表格的表头设置
const jsonFields = {  
    'type': '序号',
    'userName': '姓名',
    'age': '年龄',
    'phone': '手机号',
    'createTime': '注册时间',
}
//json数据
const tableData = [
    { "userName": "张三", "age": 18, "phone": 15612345612, "createTime": "2019-10-22" },
    { "userName": "李四", "age": 17, "phone": 15612345613, "createTime": "2019-10-23" },
    { "userName": "王五", "age": 19, "phone": 15612345615, "createTime": "2019-10-25" },
    { "userName": "赵六", "age": 18, "phone": 15612345618, "createTime": "2019-10-15" }
]
// 导出excel
function exportExcel(){
   //转换为中文表头
   const excelData = convert_excel_data(tableData, jsonFields);
   // 导出文件 '文件列表.xlsx'
   export_excel(excelData,"文件列表");
}

</script>

<template>
    <div class="export-excel">
        <el-button @click="exportExcel">导出excel</el-button>
```