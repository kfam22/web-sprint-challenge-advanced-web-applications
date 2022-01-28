import React from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';
import PrivateRoute from './PrivateRoute';

import Header from './Header';
import BloomHeader from './BloomHeader';
import Login from './Login';
import View from './View';
import Logout from './Logout';

const App = () => {
  return (
    <AppContainer>
      <BloomHeader/>
      <Header/>
      <RouteContainer>

        <Route exact path="/" component={Login}/>  
        <Route exact path="/login" component={Login}/>

        <PrivateRoute exact path="/view" component={View}/>
        <PrivateRoute exact path="/logout" component={Logout}/>

                
      </RouteContainer>
    </AppContainer>
  )
}

export default App;

//Task List
//1. [X]Create and import PrivateRoute component.
//2. [X]Create a Route for Login pointing to '/login.'
//3. [X]Create a PrivateRoute for View component point to '/view.'
//4. [X]Create a PrivateRoute for Logout component pointing to '/logout.'


const AppContainer = styled.div`
  height: 100%;
`
const RouteContainer = styled.div`
  display: flex;
  height: 85%;
  align-items: center;
  flex-direction: column;
`
