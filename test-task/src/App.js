import React from 'react';
import './App.css';
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import Login from './Login/Login';
import Reg from './Reg/Reg';
import Account from './Account/Account';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Account} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Reg} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
