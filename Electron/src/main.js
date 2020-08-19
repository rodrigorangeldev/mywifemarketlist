import React from "react";

import Home from './pages/home'
import CreateList from './components/CreteList'

import { Container } from 'react-materialize';

import { Switch, Route} from 'react-router-dom'

const Main = () => (
  <main>
    {/* <Container> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/createList" component={CreateList} />
      </Switch>
    {/* </Container> */}
  </main>  
);

export default Main;