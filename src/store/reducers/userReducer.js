import * as actionType from '../../constants/actionTypes';

import {
    updateObject
} from "../utility";


const initialState = {
    isAuthenticated: false,
    accessToken: "",
    userId: undefined,
    users: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.USER_LOGIN_SUCCESS: return setUserAuthDetails(state, action);
        case actionType.SET_USERS_DETAILS: return setUserDetails(state, action);
        default:
            return state;
    }
};
const setUserAuthDetails = (state, action) => {
    const updatedState = {
        accessToken: action.accessToken,
        isAuthenticated: true,
        userId: action.userId
    }
    return updateObject(state, updatedState);
}

const setUserDetails = (state, action) => {
    const updatedState = {
        users: action.users
    }
    return updateObject(state, updatedState);
}

export default userReducer;
