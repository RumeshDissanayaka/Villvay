import { combineReducers } from 'redux';
import userReducer from './userReducer';

import {
    USER_LOGOUT,
    CLEAN_HISTORY_DATA
} from '../../constants/actionTypes';

const appReducer = combineReducers({
    user: userReducer
});

const rootReducer = (state, action) => {
    switch (action.type) {
        case USER_LOGOUT:
        case CLEAN_HISTORY_DATA:
            state.user = undefined
            break;
        default:
            break;
    }
    return appReducer(state, action);
}
export default rootReducer;
