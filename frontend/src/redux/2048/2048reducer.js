import { UPDATE_SCORE_2048 } from "./2048Type";

const initialState = {
    score: 0
}

const reducer2048 = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_SCORE_2048:
            return {
                ...state,
                score:action.payload
            };
        default: return state;
    }
}

export default reducer2048;