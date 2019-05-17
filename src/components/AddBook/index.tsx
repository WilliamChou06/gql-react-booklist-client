import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Form, Input, Button, DatePicker, Select } from 'antd'

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`

interface Props {
  data: any,
}

class AddBook extends Component<Props> {


  render() {
    console.log(this.props)
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }
    return (
      <Form>
        <Form.Item>
          <Input placeholder="Book Title"></Input>
        </Form.Item>
        <Form.Item>
          <DatePicker showTime placeholder="Select edition date" format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Select mode="multiple" placeholder="Select authors">
            {this.props.data.authors.map((author) => <Select.Option key={author.id}>{author.name}</Select.Option>)}
          </Select>
        </Form.Item>
        <Button htmlType="submit" type="primary" ghost>Add Book!</Button>
      </Form>
    )
  }
}

// @ts-ignore
export default graphql(getAuthorsQuery)(AddBook);