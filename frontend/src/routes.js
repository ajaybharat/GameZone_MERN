import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from './Pages/Home';
import Game from './components/tic-tac-toe/Game'
import Board from './components/snake-game/Board'
import Board2 from './components/2048/Board'
import login from './Pages/login/login'
import register from './Pages/register/register'

  const Routes = () => {
    return (
        <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tic-tac-toe" component={Game} />
            <Route exact path="/snake-game" component={Board} />
            <Route exact path="/2048" component={Board2} />
            <Route exact path="/login" component={login} />
            <Route exact path="/register" component={register} />
        </Switch>
    </Router>
    );
  }

  export default Routes;