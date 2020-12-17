import React from 'react';
import createHistory from 'history/createBrowserHistory'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import './index.scss';
import App from './App';
import store from './Redux/store'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router history={createHistory()} >
      <Provider store={store}>
        <Switch>
          <Route path='/' component={App} />
        </Switch>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
