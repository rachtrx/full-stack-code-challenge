// actions/auth.js

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from './types';
import AuthService from '../api/auth.api';

export const login = (username, password) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("IN ACTIONS");
      const data = await AuthService.login(username, password);
      console.log("AFTER ACTIONS");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: username, accessToken: data },
      });
      resolve(data);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: {
          title: `Login Failed: ${message}`,
          status: "error"
        }
        
      });
      reject(error);
    }
  });
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
