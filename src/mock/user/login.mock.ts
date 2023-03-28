import { mock, intercepter } from '../config';
import { LoginResult, Role } from '../../types/userTypes';

mock.mock('/user/login', 'post', (config: any) => {
  const body: LoginResult = JSON.parse(config?.body);

  return intercepter<LoginResult>({
    token: '123abcdefg',
    username: body?.username,
    role: body?.username as Role,
  });
});
