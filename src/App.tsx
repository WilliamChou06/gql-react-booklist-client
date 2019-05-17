import React, { lazy, Suspense } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { StyledApp } from './style';

const Booklist = lazy(() => import('./components/Booklist'))
const UserInput = lazy(() => import('./components/UserInput'))



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <StyledApp>
        <Suspense fallback={<div>Loading...</div>}>
          <Booklist />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <UserInput />
        </Suspense>
      </StyledApp>
    </ApolloProvider>
  );
}

export default App;
