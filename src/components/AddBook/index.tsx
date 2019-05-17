import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../../queries';
import { Form, Input, Button, DatePicker, Select } from 'antd'




interface Props {
  data: any,
  form: any
}

interface State {
  title: string,
  edition: string,
  author: string
}

class AddBook extends Component<Props, State> {
  state = {
    title: '',
    edition: '',
    author: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form

    console.log(this.props)
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('title')(
            <Input placeholder="Book Title"></Input>

          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('edition')(
            <DatePicker showTime placeholder="Select edition date" format="YYYY-MM-DD HH:mm:ss" />

          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('authors')(<Select mode="multiple" placeholder="Select authors">
            {this.props.data.authors.map((author) => <Select.Option key={author.id} value={author.id}>{author.name}</Select.Option>)}
          </Select>)}
        </Form.Item>
        <Button htmlType="submit" type="primary" ghost>Add Book!</Button>
      </Form>
    )
  }
}

const WrappedAddBook = Form.create({ name: 'add_book' })(AddBook);

// @ts-ignore
export default graphql(getAuthorsQuery)(WrappedAddBook);