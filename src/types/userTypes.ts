import { NavItem } from './routeTypes';

export type User = {
  username: string;
  role: string;
};

export type Role = 'guest' | 'admin';

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResult = {
  token: string;
  username: string;
  role: Role;
};

export type LogoutPrams = {
  token: string;
};

export type Locale = 'zh_CN' | 'en_US';

export type UserState = {
  username: string;

  /** menu list for init tagsView */
  menuList: NavItem[];

  /** login status */
  logged: boolean;

  role: Role;

  /** user's device */
  device: 'DESKTOP';

  /** menu collapsed status */
  collapsed: boolean;

  /** notification count */
  noticeCount: number;

  /** user's language */
  locale: Locale;

  /** Is first time to view the site ? */
  newUser: boolean;
};
