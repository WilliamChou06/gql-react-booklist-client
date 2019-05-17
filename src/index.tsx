import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

// Add Global Styles here!

// const GlobalStyle = createGlobalStyle`
//   body{
//     display: flex;
//     height: 100vh;
//     width: 100vw;
//     flex-wrap: wrap;
//   }
// `

ReactDOM.render(
    <>
    {/* <GlobalStyle/> */}
    <App />
    </>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
