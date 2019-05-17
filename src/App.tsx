import React, { lazy, Suspense } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const Booklist = lazy(() => import('./components/Booklist'))
const UserInput = lazy(() => import('./components/UserInput'))



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
          <UserInput />
        </Suspense>
      </div>
    </ApolloProvider>
  );
}

export default App;
