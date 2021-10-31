import { combineReducers } from "redux";
import cakeReducer from "./cake/cakeReducer";
import userReducer from "./user/userReducer";
import reducer2048 from "./2048/2048reducer";
import reducerSnake from "./snake_game/snakeReducer";

const rootreducer = combineReducers({
    cake: cakeReducer,
    user: userReducer,
    game_2048: reducer2048,
    game_snake: reducerSnake
});

export default rootreducer;