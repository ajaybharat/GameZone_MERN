import React from 'react'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
      This is home page
      <br />
      <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
      <br />
      <Link to="/snake-game">Snake Game</Link>
      <br />
      <Link to="/2048">2048 Game</Link>
      {/* <Routes /> */}
    </div>
    )
}

export default Home
