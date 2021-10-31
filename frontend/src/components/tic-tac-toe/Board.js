import React from 'react';
import Square from './Square';
import {isgameover} from '../../helper';

class Board extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            squares:Array(9).fill(null),
            Xisnext:true,
        };
        this.ResetGame = this.ResetGame.bind(this);
    }
    handleClick(i)
    {
        const squares = this.state.squares.slice();
        if(isgameover(squares) || squares[i])
        {
            return;
        }
        squares[i]=this.state.Xisnext ? 'X' : 'O';
        this.setState({
            squares: squares,
            Xisnext: !this.state.Xisnext,
        });
    }
    ResetGame() {
        debugger;
        this.setState({
            squares: Array(9).fill(null),
            Xisnext: !this.state.Xisnext,
        });
    }
    renderSquare(i) {
        return (
          <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
          />
        );
      }
    render()
    {
        let status;
        const winner = isgameover(this.state.squares);
        if(winner)
        {
            status = 'winner: ' + winner;
        }
        else{
            status = 'Next Player is: ' + (this.state.Xisnext ? 'X' : 'O');
        }
        return(
            <div>
                <button onClick = {this.ResetGame}>Reset</button>
                <div className="status" >{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;