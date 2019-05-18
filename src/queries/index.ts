import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      title
      authors {
        id
        name
      }
    }
  }
`;

export const getBooksQuery = gql`
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
`;



export const addBookMutation = gql`
  mutation($title: String!, $authorsId: [ID!]!, $edition: String!) {
    addBook(title: $title, authorsId: $authorsId, edition: $edition) {
      title
      id
      authors {
        id
        name
      }
    }
  }
`;

export const addAuthorMutation = gql`
  mutation($name: String!) {
    addAuthor(name: $name) {
      id
      name
    }
  }
`;
