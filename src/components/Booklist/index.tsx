import React from 'react';
import { graphql } from 'react-apollo';
import { format } from 'date-fns';
import { getBooksQuery } from '../../queries';
import { StyledBooklist } from './style';

import { Table } from 'antd';



const BookList = (props) => {
  if(props.data.loading) {
    return(<div>Loading books...</div>)
  }
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Edition',
      dataIndex: 'edition',
      key: 'edition',
      render: date => date && format(date, 'DD/MM/YYYY')
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
      render: authors => authors.length
    },
  ]
  return (
    <StyledBooklist>
      <Table rowKey={'asd'} dataSource={props.data.books} columns={columns} />
    </StyledBooklist>
  );
};

export default graphql(getBooksQuery)(BookList);