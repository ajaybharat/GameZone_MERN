import { UPDATE_SCORE_snake } from "./snakeType";

export const updateSnakeScore = (val) => {
    return {
        type: UPDATE_SCORE_snake,
        payload: val
};
}