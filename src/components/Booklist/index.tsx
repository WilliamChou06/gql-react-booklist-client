import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { Table } from 'antd';

const getBooksQuery = gql`
  {
    books {
      title
      id
      edition
      authors {
        id
      }
    }
  }
`

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
      key: 'edition'
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
      render: authors => authors.length
    },
  ]
  return (
    <div>
      <Table dataSource={props.data.books} columns={columns} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);