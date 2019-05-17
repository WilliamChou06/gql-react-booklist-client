import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { addAuthorMutation } from '../../queries';
import { Form, Input, Button, Typography } from 'antd'


interface Props {
  data: any,
  form: any,
  getAuthorsQuery: any,
  addBookMutation: any,
  mutate: any
}

interface State {
  title: string,
  edition: string,
  author: string
}

class AddAuthor extends Component<Props, State> {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, { name }) => {
      if (!err) {
        console.log('Received values of form: ');
        this.props.mutate({
          variables: {
            name
          }
        });
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form

    console.log(this.props)
    return (
      <>
        <Typography.Title level={2}>Add an author!</Typography.Title>
        <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name')(
            <Input placeholder="Add Author"></Input>
          )}
        </Form.Item>
        <Button htmlType="submit" type="primary" ghost>Add an Author!</Button>
      </Form>
      </>
    )
  }
}

const WrappedAddAuthor = Form.create({ name: 'add_book' })(AddAuthor);

// @ts-ignore
export default graphql(addAuthorMutation)(WrappedAddAuthor);