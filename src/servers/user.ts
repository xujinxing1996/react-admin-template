import { LoginParams, LoginResult } from '../types/userTypes';
import { request } from '../utils/request';

export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/user/login', data);

export const apiLogout = (data: LoginParams) => request<null>('post', '/user/logout', data);
