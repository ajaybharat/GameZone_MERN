/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash';
import { useEvent,style } from '../../helper';
import Block from './Block';
import Swipe from "react-easy-swipe";
import { update2048Score } from '../../redux';
import { connect } from 'react-redux';
import axios from 'axios';


const Board = (props) => {
  const High_score = props.HighSocre;

  
useEffect(() => {
  let scorefromlocal = localStorage.getItem('2048game');
  props.updateScore(scorefromlocal);
}, [])

    const [data,setdata] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    const [score,setscore] = useState(0);

    const [gameOver,setgameOver] = useState(false);

    //initialize
    const initialize = () => {
        let newgrid = cloneDeep(data);
        // console.log(newgrid);

        addNumber(newgrid);
        // console.log(newgrid);
        addNumber(newgrid);
        // console.log(newgrid);
        setdata(newgrid);
    }

    // AddNumber - Add an item
  const addNumber = (grid) => {
    let added = false;
    let isgridfull = false;
    let attempts = 0;
    while (!added) {
      if (isgridfull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (grid[rand1][rand2] === 0) {
        grid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50) {
        isgridfull = true;
        let gameOverr = checkIfGameover();
        if (gameOverr) {
          alert("game over");
          setgameOver(true);
        }
        setgameOver(true);
      }
    }
  };

  //swipe left
  const sLeft = (dummy) => {
    console.log("swipe left");
    let oldgrid = data;
    let newarray = cloneDeep(data);
    for(let i=0; i < 4; i++)
    {
        let row = newarray[i];
        let slow = 0;
        let fast = 1;
        while(slow < 4)
        {
            if(fast === 4)
            {
                fast = slow+1;
                slow++;
                continue;
            }
            if(row[slow] === 0 && row[fast] === 0)
            {
                fast++;
            }
            else if(row[slow] === 0 && row[fast] !== 0)
            {
                row[slow] = row[fast];
                row[fast] = 0;
                fast++;
            }
            else if(row[slow] !==0 && row[fast] === 0)
            {
                fast++;
            }
            else if(row[slow] !==0 && row[fast] !== 0)
            {
                if(row[slow] === row[fast])
                {
                    row[slow] = row[slow] + row[fast];
                    row[fast] = 0;
                    fast = slow+1;
                    slow++;
                }
                else{
                    slow++
                    fast = slow+1;
                }
            }
        }
    }

    if(JSON.stringify(oldgrid) !== JSON.stringify(newarray))
    {
        addNumber(newarray);
    }

    if(dummy)
    {
        return newarray;
    }
    else{
        setdata(newarray);
    }
  };

  const sRight = (dummy) => {
    console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setdata(newArray);
    }
  };

  const sDown = (dummy) => {
    console.log("swipe down");
    let b = cloneDeep(data);
    let oldData = data;
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setdata(b);
    }
  };

  const sUp = (dummy) => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = data;
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setdata(b);
    }
  };

  const checkScore = () => {
    var sum = 0;
      for(let i = 0; i < 4; i++)
      {
        for(let j = 0; j < 4; j++)
        {
          sum += data[i][j];
        }
      }

      if(sum > score)
      {
        setscore(sum);
      }
      if(sum > High_score)
      {
        props.updateScore(sum);
        localStorage.setItem('2048game',sum);
      }
  }

  //CHECK IF GAMEOVER
  const checkIfGameover = () => {
      console.log("checking if gameover");

      let check1 = sLeft(true);
      if(JSON.stringify(data) !== JSON.stringify(check1))
      {
          return false;
      }
      let check2 = sRight(true);
      if(JSON.stringify(data) !== JSON.stringify(check2))
      {
          return false;
      }
      let check3 = sUp(true);
      if(JSON.stringify(data) !== JSON.stringify(check3))
      {
          return false;
      }
      let check4 = sDown(true);
      if(JSON.stringify(data) !== JSON.stringify(check4))
      {
          return false;
      }
      return true;
  }

  //Reset game
  const resetGame = () => {
      setgameOver(false);
    const rData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    var new_score = 0;
    addNumber(rData);
    addNumber(rData);
    setdata(rData);
    setscore(new_score);
  };

  //handle kewdown
  const handlekeydown = (e) => {
      if(gameOver)
      {
          return;
      }

      switch(e.key){
          case 'ArrowUp':
              sUp();
              break;
          case 'ArrowDown':
              sDown();
              break;
          case 'ArrowRight':
              sRight();
              break;
          case 'ArrowLeft':
              sLeft();
              break;
          default:
              break;      
      }
      checkScore();
      
      let gameover = checkIfGameover();
      if(gameover)
      {
          alert("game over");
          setgameOver(true);
      }
  };

  useEvent("keydown",handlekeydown);

  useEffect(()=>{
    initialize();
  },[])

  return (
    <div className="App">
      <div
        style={{
          width: 345,
          margin: "auto",
          marginTop: 30,
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontFamily: "sans-serif",
              flex: 1,
              fontWeight: "700",
              fontSize: 60,
              color: "#776e65",
            }}
          >
            2048
          </div>
          
          <div
            style={{
              flex: 1,
              marginTop: "auto",
            }}
          >
            <div style = {{
              fontWeight: "100",
              fontSize: 22,
              color: "#776e65",
              paddingBottom: 10,
            }}>
              <div>
                <span>Score</span>
                 <span> {score}</span>
                 </div> 
                 <div>
                <span>High Score</span>
                 <span> {High_score}</span>
                 </div>
                 </div>
          </div>
        </div>
        
        <div onClick={resetGame} style={style.newGameButton}>
              NEW GAME
            </div>
        <div
          style={{
            background: "#AD9D8F",
            width: "max-content",
            height: "max-content",
            margin: "auto",
            padding: 5,
            borderRadius: 5,
            marginTop: 10,
            position: "relative",
          }}
        >
          {gameOver && (
            <div style={style.gameOverOverlay}>
              <div>
                <div
                  style={{
                    fontSize: 30,
                    fontFamily: "sans-serif",
                    fontWeight: "900",
                    color: "#776E65",
                  }}
                >
                  Game Over
                </div>
                <div>
                  <div
                    style={{
                      flex: 1,
                      marginTop: "auto",
                    }}
                  >
                    <div onClick={resetGame} style={style.tryAgainButton}>
                      Try Again
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Swipe
            onSwipeDown={() => {
              sDown();
            }}
            onSwipeLeft={() => sLeft()}
            onSwipeRight={() => sRight()}
            onSwipeUp={() => sUp()}
            style={{ overflowY: "hidden" }}
          >
            {data.map((row, oneIndex) => {
              return (
                <div style={{ display: "flex" }} key={oneIndex}>
                  {row.map((digit, index) => (
                    <Block num={digit} key={index} />
                  ))}
                </div>
              );
            })}
          </Swipe>
        </div>

        <div style={{ width: "inherit" }}>
          <p class="game-explanation">
            <strong class="important">How to play:</strong> Use your{" "}
            <strong>arrow keys</strong> to move the tiles. When two tiles with
            the same number touch, they <strong>merge into one!</strong>
          </p>
        </div>
      </div>
    </div>
  );
    
    
};

const mapStatetoProps = state => {
  return {
    HighSocre: state.game_2048.score
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    updateScore: (scor) => { dispatch(update2048Score(scor)) }
  }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Board);
