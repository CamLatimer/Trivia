import Router from './Router';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  // grab value of isUserLoggedIn from script injected before bundle.js
  <Router loggedIn={isUserLoggedIn} email={isUserLoggedIn ? userEmail : null}/>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
