import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from './Pages/Home/Home';
import Game from './components/tic-tac-toe/Game'
import Board from './components/snake-game/Board'
import Board2 from './components/2048/Board'
import Login from './Pages/login/login'
import Register from './Pages/register/register'
import TopBar from './components/TopBar/topbar'

  const Routes = () => {
    var user = localStorage.getItem('user') || null;
    return (
        <Router>
          <TopBar />
        <Switch>
            <Route exact path="/">{user ? <Home /> : <Login /> }</Route>
            <Route exact path="/tic-tac-toe">{user ? <Game /> : <Login /> }</Route>
            <Route exact path="/snake-game">{user ? <Board /> : <Login /> }</Route>
            <Route exact path="/2048">{user ? <Board2 /> : <Login /> }</Route>
            <Route exact path="/login">{user ? <Home /> : <Login /> }</Route>
            <Route exact path="/register">{user ? <Home /> : <Register /> }</Route>
        </Switch>
    </Router>
    );
  }

  export default Routes;

