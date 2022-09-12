import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import React from 'react';

interface DataType {
  key: React.Key;
  id: number;
  Fullname: string;
  Days: {
    [N: number]: number,
  },
  Monthly: number
}

interface TableProps {
  usersData: Array<DataType> | []
}

const leftColumns: ColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'Fullname',
    key: 'id',
    fixed: 'left',
    sorter: (a, b) => a.Fullname.localeCompare(b.Fullname)
  }
];

const rightColumns: ColumnsType<DataType>  = [
  {
    title: 'All time',
    key: 'id',
    fixed: 'right',
    dataIndex: 'Monthly',
    width: 100,
    render: (monthly) => makeTimeString(monthly),
    sorter: (a, b) => b.Monthly - a.Monthly
  }
]

function makeColumns(columns: number) {
  const columnsArr:ColumnsType<DataType> = [];
  for (let i = 1; i <= columns; i++) {
    columnsArr.push(
      {
        title: i,
        dataIndex: 'Days',
        key: i,
        render: (time) => makeTimeString(time[i]),
        sorter: (a, b) => b.Days[i] - a.Days[i]
      })
  }
  return columnsArr
}

function makeTimeString(seconds: number) {
  if (seconds === 0) return `0`
  const hours = Math.floor( seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}:${minutes}`
}

const columns: ColumnsType<DataType> = [...leftColumns, ...makeColumns(31), ...rightColumns];


const MainTable: React.FC<TableProps> = ({usersData}) => {
  return <Table columns={columns} dataSource={usersData} scroll={{ x: 2200 }}/>;
}

export default MainTable;


