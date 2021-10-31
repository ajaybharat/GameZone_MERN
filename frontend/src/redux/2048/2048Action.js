import { UPDATE_SCORE_2048 } from "./2048Type";

export const update2048Score = (val) => {
    return {
        type: UPDATE_SCORE_2048,
        payload: val
};
}