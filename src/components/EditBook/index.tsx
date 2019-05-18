import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBookQuery } from '../../queries';
import { Form, Input, Button, DatePicker, Select, Typography } from 'antd'




interface Props {
  data: any;
  form: any;
  getAuthorsQuery: any;
  addBookMutation: any;
  match: any;
  getBookQuery: any;
}

interface State {
  title: string,
  edition: string,
  author: string
}

class EditBook extends Component<Props, State> {
  state = {
    title: '',
    edition: '',
    author: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, { title, edition, authors }) => {
      if (!err) {
        console.log('Received values of form: ');
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

    if (this.props.getAuthorsQuery.loading || !this.props.getBookQuery.book) {
      return <div>Loading...</div>
    }

    const book = this.props.getBookQuery.book;
    const authorIds = book.authors.map(author => author.id)
    console.log(authorIds)

    return (
      <>
        <Typography.Title level={2}>Edit {console.log(this.props.getAuthorsQuery)}</Typography.Title>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('title')(
              <Input placeholder="Book Title" value={book.title}></Input>

            )}
          </Form.Item>
          {console.log(book.authors)}
          <Form.Item>
            {getFieldDecorator('edition')(
              <DatePicker placeholder="Select edition date" format="YYYY-MM-DD HH:mm:ss" />

            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('authors', {
              initialValue: authorIds
            })(<Select mode="multiple" placeholder="Select authors" defaultValue={{ key: '5cdec65492da4e0e08732512' }}>
              {this.props.getAuthorsQuery.authors.map((author) => <Select.Option key={author.id} value={author.id}>{author.name}</Select.Option>)}
            </Select>)}
          </Form.Item>
          <Button htmlType="submit" type="primary" ghost>Add Book!</Button>
        </Form>
      </>
    )
  }
}

const WrappedEditBook = Form.create({ name: 'add_book' })(EditBook);

// @ts-ignore
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
  graphql(getBookQuery, {
    name: 'getBookQuery',
    options: (props: Props) => {
      console.log(props.match.params.bookId)
      return {
        variables: {
          id: props.match.params.bookId
        }
      }
    }
  }),
)(WrappedEditBook);