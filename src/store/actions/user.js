import * as actionType from '../../constants/actionTypes';
import axios from 'axios';

export const userLoginRequest = (res) => {
  return {
    type: actionType.USER_LOGIN_SUCCESS,
    userId: res.id,
    accessToken: res.token,
  }
}

export const getUsersDetails = (res) => {
  return (dispatch) => {
    axios.get(`https://reqres.in/api/users?page=2`)
      .then(response => {
        dispatch(populateUserDetails(response.data.data));
      }).catch((error) => {
        console.log(error)
      });
  }
}


export const populateUserDetails = (res) => {
  return {
    type: actionType.SET_USERS_DETAILS,
    users: res
  }
}

export const cleanHistoryData = () => {
  return {
    type: actionType.CLEAN_HISTORY_DATA
  }
}

