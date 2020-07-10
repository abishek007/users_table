import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import store from './container/store'
import UserRoutes from "./component/router"

ReactDOM.render(
  <Provider store={store}>
    <UserRoutes />
  </Provider>,
   document.getElementById('root')
 )