import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBookQuery, editBookMutation, getBooksQuery } from '../../queries';
import { Form, Input, Button, DatePicker, Select, Typography } from 'antd';

interface Props {
  data: any;
  form: any;
  getAuthorsQuery: any;
  addBookMutation: any;
  match: any;
  getBookQuery: any;
  editBookMutation: any;
  history: any
}


class EditBook extends Component<Props> {
  

  // Push to root directory if cancel btn clicked
  handleCancel = (e: React.FormEvent<HTMLButtonElement>)=> {
    e.preventDefault();
    this.props.history.push('/');
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, { title, edition, authors }) => {
      if (!err) {
        // Call edit mutation, repopulate table and push to root path
        this.props.editBookMutation({
          variables: {
            id: this.props.match.params.bookId,
            title,
            edition,
            authorsId: authors
          },
          refetchQueries: [{
            query: getBooksQuery
          }]
        });
        this.props.history.push('/');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form


    if (this.props.getAuthorsQuery.loading || !this.props.getBookQuery.book) {
      return <div>Loading...</div>
    }

    // Store book object in variable
    const book = this.props.getBookQuery.book;
    const authorIds = book.authors.map(author => author.id)

    return (
      <>
        <Typography.Title level={2}>Editing: {book.title}</Typography.Title>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('title', {
              initialValue: book.title
            })(
              <Input placeholder="Book Title" ></Input>

            )}
          </Form.Item>
          {console.log(book.authors)}
          <Form.Item>
            {getFieldDecorator('edition', {
              // antd uses moment objects so it's not possible to set a default value
              // with date-fns
              // Either replace antd or dane-fns with moment.js
              initialValue: book.edition
            })(
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
          <Button htmlType="submit" type="primary" ghost>Edit Book!</Button>
          <Button onClick={this.handleCancel} type="danger" ghost>Cancel</Button>
        </Form>
      </>
    )
  }
}

const WrappedEditBook = Form.create({ name: 'add_book' })(EditBook);

// Compose all GraphQL queries
// @ts-ignore
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
  graphql(editBookMutation, { name: 'editBookMutation' }),
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