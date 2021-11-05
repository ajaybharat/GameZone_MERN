// eslint-disable-next-line
import React, {useState,useEffect} from 'react'
import { ReverseLinkedList,randomIntForFood,useInterval,useEvent } from '../../helper';
import { connect } from 'react-redux';
import { updateSnakeScore } from '../../redux';

const BORDER = 15;
const PROBABILITY_OF_DIRECTION_REVERSAL_FOOD = 0.3;

class LinkedListNode {
 constructor(value)
 {
     this.value = value;
     this.next = null;
 }
}

class LinkedList {
    constructor(value)
    {
        const node = new LinkedListNode(value);
        this.head = node;
        this.tail = node;
    }
}

const DIRECTION = {
    UP : 'UP',
    DOWN : 'DOWN',
    RIGHT : 'RIGHT',
    LEFT : 'LEFT'
};

const getSnakeStartingValue = board => {
    const rowSize = board.length;
    const colSize = board[0].length;
    const startrow = Math.round( rowSize / 4 );
    const startcol = Math.round( colSize / 4 );
    const start = board[startrow][startcol];
    return {
        row: startrow,
        col: startcol,
        cell: start
    }
}

const SnakeBoard = (props) => {
    const HighScore = props.HighScoreSnake;
    const [score, setscore] = useState(0);    
    const [board] = useState(createboard());
    const [snake, setsnake] = useState(new LinkedList(getSnakeStartingValue(board)));
    const [snakecells, setsnakecells] = useState(new Set([snake.head.value.cell]));
    const [foodcell, setfoodcell] = useState(snake.head.value.cell + 5);
    const [direction, setdirection] = useState(DIRECTION.RIGHT);
    const [foodShouldReverseDirection, setfoodShouldReverseDirection] = useState(false);



    useEffect(() => {
        let scorefromlocal = localStorage.getItem('snakegame');
        props.updateSnakeScore(scorefromlocal);
    }, [props])

    // useEffect(() => {
    //     window.addEventListener('keydown',e => {
    //         handleKeyDown(e);
    //     });
    // },[]);
    

    useInterval(() => {
        moveSnake();
    }, 150)

    const handleKeyDown = e => {
        const newDirection = getDirectionFromKey(e.key);
        if(newDirection === '') return;
        const snakewillRunintoitself = getOppositedirec(newDirection);
        if(snakewillRunintoitself === direction && snakecells.size > 1)
        {
            return;
        }
        setdirection(newDirection);
    };

    useEvent("keydown",handleKeyDown);


    const handleGameOver = () => {
        setscore(0);
        let snakestartingvalue = getSnakeStartingValue(board);
        setsnake(new LinkedList(snakestartingvalue));
        setfoodcell(snakestartingvalue.cell + 5);
        setsnakecells(new Set([snakestartingvalue.cell]));
        setdirection(DIRECTION.RIGHT);
        setfoodShouldReverseDirection(false);
    };
    
    const moveSnake = () => {
        const currentHeadNode = {
            row: snake.head.value.row,
            col: snake.head.value.col,
        }

        const nextHeadCords = getCordsInDirection(currentHeadNode, direction);
        if(isOutOfBound(nextHeadCords))
        {
            handleGameOver();
            return;
        }

        const nextHeadCell = board[nextHeadCords.row][nextHeadCords.col];
        if(snakecells.has(nextHeadCell))
        {
            handleGameOver();
            return;
        }

        const newHead = new LinkedListNode({
            row: nextHeadCords.row,
            col: nextHeadCords.col,
            cell: nextHeadCell,
        });
        const currentHead = snake.head;
        snake.head = newHead;
        currentHead.next = newHead;
        
        const newsnakecells = new Set([nextHeadCell]);
        for (const item of snakecells) newsnakecells.add(item)
        newsnakecells.delete(snake.tail.value.cell);
        // newsnakecells.add(nextHeadCell);

        snake.tail = snake.tail.next;
        if(snake.tail === null) return snake.tail = snake.head;

        const foodconsumed = nextHeadCell === foodcell;
        if(foodconsumed)
        {
            growSnake(newsnakecells);
            if(foodShouldReverseDirection) reverseSnake();
            handlefoodConsumption(newsnakecells);
        }

        setsnakecells(newsnakecells);
    };

    const growSnake = (newsnakecells) => {
        const growthNodeCords = getGrowthnodecords(snake.tail, direction);
        if(isOutOfBound(growthNodeCords))
        {
            return;
        }
        const newTailCell = board[growthNodeCords.row][growthNodeCords.col];
        const newTail = new LinkedListNode({
            row: growthNodeCords.row,
            col: growthNodeCords.col,
            cell: newTailCell,
        });

        const currentTail = snake.tail;
        snake.tail = newTail;
        snake.tail.next = currentTail;

        newsnakecells.add(newTailCell);
    };

    const reverseSnake = () => {
        const tailnextnodeDirection = getnextNodeDirection(snake.tail, direction);
        const nextdirection = getOppositedirec(tailnextnodeDirection);
        setdirection(nextdirection);

        //The tail of snake is actually the head which is why we need to pass this to reverseLinked list
        ReverseLinkedList(snake.tail);
        const snakehead = snake.head;
        snake.head = snake.tail;
        snake.tail = snakehead
    };

    const handlefoodConsumption = (newsnakecells) => {
        const maxPossibleCellValue = BORDER * BORDER;
        let nextFoodCell;
        while(true)
        {
            nextFoodCell = randomIntForFood(1, maxPossibleCellValue);
            if(newsnakecells.has(nextFoodCell) || foodcell === nextFoodCell)
            {
                continue;
            }
            break;
        }

        const nextfoodShouldreverseDirection = Math.random() < PROBABILITY_OF_DIRECTION_REVERSAL_FOOD;

        setfoodcell(nextFoodCell);
        setfoodShouldReverseDirection(nextfoodShouldreverseDirection);
        if((score+1) > HighScore)
        {
            let new_score = score+1;
            localStorage.setItem('snakegame',new_score);
            props.updateSnakeScore(new_score);
        }
        setscore(score+1);
    };


    return (
        <div className="snakeGame">
            <h3 className="snakescore">Score: {score} High Score: {HighScore}</h3>
            <div className = "outerBorder">
            
                {board.map((row, rowIndx) => (
                    <div key = {rowIndx} className = "row">
                        {row.map((cell, cellIndx) => (
                            <div key = {cellIndx} className = {getClassName(cell,foodcell,foodShouldReverseDirection,snakecells)}></div>
                        ))}
                    </div>
                ))}
            </div>
            <div><h3 style={{fontWeight:400}}>How to play: Use your arrow keys to move the tiles.</h3></div>
        </div>
    );
};

function createboard()
{
    let count = 1;
    const b = [];
    for(let i = 0; i < BORDER; i++)
    {
        let a = [];
        for(let j = 0; j < BORDER; j++)
        {
            a.push(count++);
        }
        b.push(a);
    }
    return b;
}

const getCordsInDirection = (cords, Direction) => {
    if(Direction === DIRECTION.UP)
    {
        return {
            row: cords.row - 1,
            col: cords.col,
        }
    }
    else if(Direction === DIRECTION.DOWN)
    {
        return {
            row: cords.row + 1,
            col: cords.col,
        }
    }
    else if(Direction === DIRECTION.LEFT)
    {
        return {
            row: cords.row,
            col: cords.col - 1,
        }
    }
    else if(Direction === DIRECTION.RIGHT) {
        return {
            row: cords.row,
            col: cords.col + 1,
        }
    }
};

const isOutOfBound = (cords) => {
    const {row,col} = cords;
    if(row < 0 || col < 0) return true;
    if(row >= BORDER || col >= BORDER) return true;
    return false;
}

const getnextNodeDirection = (node, curretnDirection) => {
    if(node.next == null) return curretnDirection;
    const {row: currentrow, col: currentcol} = node.value;
    const {row: nextrow, col: nextcol} = node.next.value; 
    if(nextrow === currentrow && nextcol === currentcol + 1)
    {
        return DIRECTION.RIGHT;
    }
    else if(nextrow === currentrow && nextcol === currentcol - 1)
    {
        return DIRECTION.LEFT;
    }
    else if(nextrow === currentrow + 1 && nextcol === currentcol)
    {
        return DIRECTION.DOWN;
    }
    else if(nextrow === currentrow - 1 && nextcol === currentcol)
    {
        return DIRECTION.UP;
    }
    else{
        return ''
    }
}

const getGrowthnodecords = (snaketail, currentDIRECTION) => {
    const tailnextnodeDirection = getnextNodeDirection(snaketail, currentDIRECTION);
    const growthDirection = getOppositedirec(tailnextnodeDirection);
    const currenttailcords = {
        row: snaketail.value.row,
        col: snaketail.value.col,
    };

    const growthnodecords = getCordsInDirection(currenttailcords, growthDirection);
    return growthnodecords;
}

const getDirectionFromKey = key => {
    if(key === 'ArrowUp') return DIRECTION.UP;
    if(key === 'ArrowDown') return DIRECTION.DOWN;
    if(key === 'ArrowRight') return DIRECTION.RIGHT;
    if(key === 'ArrowLeft') return DIRECTION.LEFT;
    return '';
}



const getOppositedirec = direct => {
    if(direct === DIRECTION.UP) return DIRECTION.DOWN;
    if(direct === DIRECTION.DOWN) return DIRECTION.UP;
    if(direct === DIRECTION.RIGHT) return DIRECTION.LEFT;
    if(direct === DIRECTION.LEFT) return DIRECTION.RIGHT;
    return '';
}

const getClassName = (cellvalue, foodcell, foodShouldReverseDirection, snakecells) => {
    let className = 'cell';
    if(foodcell === cellvalue)
    {
        if(foodShouldReverseDirection) {
            className = 'cell reversing-cell'
        }
        else {
            className = 'cell food-cell';
        }
    }
    if(snakecells.has(cellvalue)) className = 'cell snake-cell';

    return className;
}

const mapStatetoProps = state => {
    return {
        HighScoreSnake: state.game_snake.Snakescore
    }
  }
  
  const mapDispatchtoProps = dispatch => {
    return {
      updateSnakeScore: (scor) => { dispatch(updateSnakeScore(scor)) }
    }
  }

export default connect(mapStatetoProps,mapDispatchtoProps)(SnakeBoard);