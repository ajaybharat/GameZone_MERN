import { FETCH_USERS_FAILURE,FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS } from "./userType"

const initialState = {
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                user: [],
                error: action.payload
            }
        default: return state
    }
}

export default userReducer