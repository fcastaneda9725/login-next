import Router from 'next/router';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie, getCookieFromBrowser } from '../../utils/cookie';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = (user , type) => {
  console.log(user);
  if (type !== 'signin' && type !== 'signup') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/Login`, user )
      .then((response) => {
        console.log(response.data);
        setCookie('token', response.data.tokenKey);
        Router.push('/');
        dispatch({type: AUTHENTICATE, payload: response.data.tokenKey});
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, payload: token});
  };
};

// removing the token
const deauthenticate = () => {
  const data = getCookieFromBrowser();
  console.log(data);
  return (dispatch) => {
    axios.post(`${API}Logout/?APIKey=${data.token}`)
      .then((response) => {
        console.log(response.data);
        removeCookie('token');
        Router.push('/');
        dispatch({type: DEAUTHENTICATE});
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};


export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
