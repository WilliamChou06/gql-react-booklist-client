import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Table } from 'antd';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const BookList = () => {
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
      key: 'authors'
    },
  ]
  return (
    <ApolloProvider client={client}>
      <div>
        <Table columns={columns} />
      </div>
    </ApolloProvider>
  );
};

export default BookList;