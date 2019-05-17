import React, { lazy, Suspense } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// import Booklist from './components/Booklist';
const Booklist = lazy(() => import('./components/Booklist'))
const AddBook = lazy(() => import('./components/AddBook'))



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Booklist />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AddBook />
        </Suspense>
        
      </div>
    </ApolloProvider>
  );
}

export default App;
