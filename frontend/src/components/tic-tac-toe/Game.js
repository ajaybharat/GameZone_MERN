import React from 'react';
import Board from './Board';


class Game extends React.Component{
    render()
    {
        return(
            <div>
            <h1 className="ticktactitle">TIC - TAC - TOE</h1>
        <div className="gameTictactoe">
            
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info"></div>
        </div>
        </div>
        );
        
    }
}

export default Game;