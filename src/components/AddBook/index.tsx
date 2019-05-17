import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../../queries';
import { Form, Input, Button, DatePicker, Select, Typography } from 'antd'




interface Props {
  data: any,
  form: any,
  getAuthorsQuery: any,
  addBookMutation: any
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
    this.props.form.validateFields((err, {title, edition, authors}) => {
      if (!err) {
        console.log('Received values of form: ', );
        this.props.addBookMutation({
          variables: {
            title,
            edition,
            authorsId: authors
          }
        });
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form

    console.log(this.props)
    if (this.props.getAuthorsQuery.loading) {
      return <div>Loading...</div>
    }
    return (
      <>
        <Typography.Title level={2}>Add a Book!</Typography.Title>
        <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('title')(
            <Input placeholder="Book Title"></Input>

          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('edition')(
            <DatePicker placeholder="Select edition date" format="YYYY-MM-DD HH:mm:ss" />

          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('authors')(<Select mode="multiple" placeholder="Select authors">
            {this.props.getAuthorsQuery.authors.map((author) => <Select.Option key={author.id} value={author.id}>{author.name}</Select.Option>)}
          </Select>)}
        </Form.Item>
        <Button htmlType="submit" type="primary" ghost>Add Book!</Button>
      </Form>
      </>
    )
  }
}

const WrappedAddBook = Form.create({ name: 'add_book' })(AddBook);

// @ts-ignore
export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)(WrappedAddBook);