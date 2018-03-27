import React, { Component } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
//import axios from "axios";


import './App.css';

import HomeApp from './ComponentsInterface/HomeApp/HomeApp';
import ViewPassenger from './ComponentsInterface/ViewPassenger/ViewPassenger';
import ViewStewardess from './ComponentsInterface/ViewStewardess/ViewStewardess';
import ViewCheck from './ComponentsInterface/ViewCheck/ViewCheck';
import Purchase from './ComponentsInterface/ViewPassenger/Purchase/Purchase';
import ConfirmPurchase from './ComponentsInterface/ViewPassenger/ConfirmPurchase/ConfirmPurchase';
import ConfirmCheck from './ComponentsInterface/ViewCheck/ConfirmCheck/ConfirmCheck';
import SeeFood from './ComponentsInterface/ViewStewardess/SeeFood/SeeFood';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={
                    ({history}) => <HomeApp history={history}/>
                  }></Route>
             <Route path="/ViewPassenger" render={
                    ({history}) => <ViewPassenger history={history}/>
                  }></Route>

              <Route path="/ViewStewardess" render={
                    ({history}) => <ViewStewardess history={history}/>
                  }></Route>
              <Route path="/ViewCheck" render={
                    ({history}) => <ViewCheck history={history}/>
                  }></Route>
              <Route path="/Purchase" render={
                    ({history}) => <Purchase history={history}/>
                  }></Route>
              <Route path="/ConfirmPurchase" render={
                    ({history}) => <ConfirmPurchase history={history}/>
                  }></Route>
              <Route path="/ConfirmCheck" render={
                    ({history}) => <ConfirmCheck history={history}/>
                  }></Route>
              <Route path="/SeeFood" render={
                    ({history}) => <SeeFood history={history}/>
                  }></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
