import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import 'antd/dist/antd.css'
import App from './App';
import EditBook from './components/EditBook';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const history = createBrowserHistory();


ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/edit/:bookId" component={EditBook} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
