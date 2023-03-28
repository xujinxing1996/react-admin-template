import { ActionFunction, redirect } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export const action: ActionFunction = () => {
  removeToken();
  return redirect('/login');
};
