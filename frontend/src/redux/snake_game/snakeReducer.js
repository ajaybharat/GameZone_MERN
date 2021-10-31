import { UPDATE_SCORE_snake } from "./snakeType";

const initialState = {
    Snakescore: 0
}

const reducerSnake = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_SCORE_snake:
            return {
                ...state,
                Snakescore:action.payload
            };
        default: return state;
    }
}

export default reducerSnake;