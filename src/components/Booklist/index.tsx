import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';
import _ from 'lodash';
import { getBooksQuery } from '../../queries';
import { StyledBooklistContainer } from './style';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';


import { Table, Input, Icon, Button } from 'antd';
import Highlighter from 'react-highlight-words';

interface Props {
  data: any;
}

class BookList extends Component<Props> {
  state = {
    searchText: '',
    authorsTabFilter: ''
  }

  // Edition sorting method

  sortEditions = (a, b) => {
    if (a.edition > b.edition) {
      return 1
    }
    if (a.edition === b.edition) {
      return 0
    }
    return -1
  }


  // Get all table Author tab filters
  // Ugly implementation
  getAllAuthorsList = () => {
    const authorsFilter = [];
    const books = this.props.data.books;
    books.forEach(book => book.authors.forEach(author => authorsFilter.push({ text: author.name, value: author.name })));
    return _.uniqBy(authorsFilter, 'value')
  }

  // antd search filter
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            // @ts-ignore
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // @ts-ignore
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    if (this.props.data.loading) {
      return <Spinner />
    }

    // Table columns and sorting functions
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 300,
        sorter: (a, b) => a.title.localeCompare(b.title),
        ...this.getColumnSearchProps('title')
      },
      {
        title: 'Edition',
        dataIndex: 'edition',
        key: 'edition',
        width: 100,
        render: date => date && moment(date).format('DD/MM/YYYY'),
        sorter: this.sortEditions
      },
      {
        title: <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}><p style={{ marginBottom: 0 }}>#<Icon type="user" /></p></div>,
        dataIndex: 'authors',
        key: '#authors',
        width: 60,
        render: authors => <div style={{ width: '100%', textAlign: 'center' }} >{authors.length}</div>,
        sorter: (a, b) => a.authors.length - b.authors.length,

      },
      {
        title: 'Authors',
        dataIndex: 'authors',
        key: 'authors',
        render: authors => authors.map(author => author.name).join(', '),
        sorter: (a, b) => a.authors[0].name.localeCompare(b.authors[0].name),
        filters: this.getAllAuthorsList(),
        onFilter: (value, record) => record.authors.map(author => author.name).join(', ').indexOf(value) >= 0
      },
      {
        title: 'Actions',
        render: book => {
          // Rendering actions for each table item
          // Icon style is in-line because it's too much of a hassle to 
          // put in style.ts at the moment
          return <span><Link to={`/edit/${book.id}`}><Icon style={{ fontSize: '18px' }} type="edit" /></Link></span>
        }
      }
    ]
    return (
      <StyledBooklistContainer>
        <Table dataSource={this.props.data.books} columns={columns} size="middle" />
      </StyledBooklistContainer>
    );
  }
};

// @ts-ignore
export default graphql(getBooksQuery)(BookList);