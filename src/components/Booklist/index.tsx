import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { format, compareDesc } from 'date-fns';
import { getBooksQuery } from '../../queries';
import { StyledBooklist } from './style';
import {Link} from 'react-router-dom';

import { Table, Input, Icon, Button } from 'antd';
import Highlighter from 'react-highlight-words';

interface Props {
  data: any;
}

class BookList extends Component<Props> {
  state = {
    searchText: ''
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
    onFilter: (value, record) =>
      {console.log(record)
        return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())},
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // @ts-ignore
        setTimeout(() => this.searchInput.select());
      }
    },
    // render: text => (
    //   <Highlighter
    //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     searchWords={[this.state.searchText]}
    //     autoEscape
    //     textToHighlight={text.toString()}
    //   />
    // ),
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
    
    // Table columns and sorting functions
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        ...this.getColumnSearchProps('title')
      },
      {
        title: 'Edition',
        dataIndex: 'edition',
        key: 'edition',
        render: date => date && format(date, 'DD/MM/YYYY'),
        sorter: (a, b) =>  compareDesc(a.edition, b.edition)
      },
      {
        title: 'Authors',
        dataIndex: 'authors',
        key: 'authors',
        render: authors => authors.length,
        sorter: (a, b) => a.authors.length - b.authors.length,

      },
      {
        title: 'Actions',
        render: book => {
          // Rendering actions for each table item
          // Icon style is in-line because it's too much of a hassle to 
          // put in style.ts at the moment
          return  <span><Link to={`/edit/${book.id}`}><Icon style={{fontSize: '18px'}} type="edit" /></Link></span>
        }
      }
    ]
    return (
      <StyledBooklist>
        <Table dataSource={this.props.data.books} columns={columns} />
      </StyledBooklist>
    );
  }
};

// @ts-ignore
export default graphql(getBooksQuery)(BookList);