import React from 'react'
import { Link } from "react-router-dom";
import './home.css';

function Home() {
    return (
      <div className="games">
      <div className="game">
      <img
        className="gameImg"
        src="https://media.istockphoto.com/photos/top-view-of-tic-tac-toe-game-on-wooden-toy-blocks-against-orange-picture-id1208578184?k=20&m=1208578184&s=612x612&w=0&h=Rq-AOS1xqCwbRVhWAb3U565BVPyncTxpDBRE3NWoouA="
        alt=""
      />
      <div className="gameInfo">
        <span className="gameTitle">
        <Link to="/tic-tac-toe" className="gamelink">Tic-Tac-Toe</Link>
        </span>
        <hr />
      </div>
      <p className="gameDesc">
      Tic-tac-toe is a game in which two players take turns in drawing either an ' O' or an ' X' in one square of a grid consisting of nine squares. The winner is the first player to get three of the same symbols in a row.
      </p>
    </div>
    <div className="game">
      <img
        className="gameImg"
        src="https://dreamworldrobotics.com/wp-content/uploads/2020/05/snake-game-poster.png"
        alt=""
      />
      <div className="gameInfo">
        <span className="gameTitle">
        <Link to="/snake-game" className="gamelink">Reversable Snake Game</Link>
        </span>
        <hr />
      </div>
      <p className="gameDesc">
      Reversable Snake game is a computer action game, whose goal is to control a snake to move and collect food in a map. Scores given by these functions are aggregated by linear weighted sum, and the snake takes the action that leads to the highest score.
      </p>
    </div>
    <div className="game">
      <img
        className="gameImg"
        src="https://lh3.ggpht.com/vmKrtWTNbrwnyPSsJQOZLefLD0Opcfrxrj6F6NddYu3Nj41vSgjyFsB9DIv05U892w"
        alt=""
      />
      <div className="gameInfo">
        <span className="gameTitle">
        <Link to="/2048" className="gamelink">2048 Game</Link>
        </span>
        <hr />
      </div>
      <p className="gameDesc">
      2048 is played on a plain 4×4 grid, with numbered tiles that slide when a player moves them using the four arrow keys.[3] Every turn, a new tile randomly appears in an empty spot on the board with a value of either 2 or 4.[4] Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided.[5][6] The resulting tile cannot merge with another tile again in the same move.
      </p>
    </div>
    </div>
    )
}

export default Home
