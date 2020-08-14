import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Create from './pages/create'
import List from './pages/list'
import Header from './components/Header'

const Routes = () => (
  <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/createList" component={ Create } />
        <Route exact path="/createList/:id" render={(props) => (<Create {...props} />)}/> 
        <Route exact path="/list/:id" component={ List }  />     
      </Switch>
  </BrowserRouter>  
);

export default Routes;