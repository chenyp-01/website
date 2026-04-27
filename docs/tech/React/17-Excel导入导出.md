## 导入和导出的完整代码

```jsx

import React from 'react';
import { Upload, Button, message, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// 引入XLSX
import * as XLSX from 'xlsx'
import { useState } from 'react';
import { useEffect } from 'react';

/**
 * Excel 导入：将表格转换成json 数据 ；npm i xlsx
 * Excel 导出：将json数据转换成表格 ；
 *
 * npm : https://www.npmjs.com/package/xlsx
 */


//表格的表头
const columns = [
  {
    title: "姓名",
    name: 'name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: "年龄",
    name: 'age',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: "年级",
    name: 'grade',
    dataIndex: 'grade',
    key: 'grade',
    align: 'center',
  },
]

// Excel组件
const Excel = () => {
  const [fileList, setfileList] = useState([])  //上传文件列表
  const [uploading, setuploading] = useState(false) //上传状态
  const [dataSource, setdataSource] = useState([]) //表格数据

  //读取上传文件信息
  const readFile = () => {
    return new Promise(resolve => {
      // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
      let reader = new FileReader()
      // 该方法用于将File对象转化为二进制文件
      reader.readAsBinaryString(fileList[0])
      // 当把文件所有数据加载完毕后，把数据传给promise的下一步
      reader.onload = ev => {
        resolve(ev.target.result)
      }
    })
  }

  // 把上传*.xlsx解析为json
  const onChange = async (file) => {
    console.log('onchange');
    setuploading(true)
    // 获取上传excel的文件数据
    let dataBinary = await readFile();
    // 获取工作簿对象
    let workBook = XLSX.read(dataBinary, { type: "binary", cellDates: true });
    // 获取第一个工作表的数据
    let workSheet = workBook.Sheets[workBook.SheetNames[0]];
    // 把工作表数据转为json
    const data = XLSX.utils.sheet_to_json(workSheet);
    setuploading(false)
    setfileList([])
    setdataSource(data)
    //把json传给tableData
  }

  //fileList变化时调用onChange
  useEffect(() => {
    if (fileList.length === 0) return;
    onChange()
  }, [fileList])


  //上传组件Upload的props配置
  const props = {
    beforeUpload: file => {
      let arr = file.name.split('.');
      if (arr[arr.length - 1] === 'xlsx') {
        setfileList(() => [file])
      } else {
        message.warn("请选择正确的文件");
      }
      return false;
    },
    fileList,
    maxCount: 1,
  };


  //把json导出为excel
  const handleExport = () => {
    let workbook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(dataSource.map(item => {
      delete item.key
      return item
    }));

    // table1为工作表的名字
    XLSX.utils.book_append_sheet(workbook, workSheet, 'table1')
    XLSX.writeFileXLSX(workbook, '学生11.xlsx')
  }


  return (
    <>
      <Upload {...props} disabled={uploading}>
        <Button icon={<UploadOutlined />} disabled={uploading} loading={uploading}>
          {uploading ? '正在导入...' : 'Excel导入'}
        </Button>
      </Upload>

      <Button onClick={handleExport}>导出</Button>
      
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={(record)=>record.name}
      />
    </>
  );
}

export default Excel;

```

