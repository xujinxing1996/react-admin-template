import { redirect } from 'react-router-dom';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  return localStorage.removeItem('token');
};

export const checkTokenLoader = () => {
  const token = getToken();
  if (!token) {
    return redirect('/login');
  }

  return { username: 'admin' };
};

export const rootLoader = () => {
  return getToken();
};
