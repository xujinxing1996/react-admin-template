import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { faHome, faFileLines, faDiamondTurnRight, faUserLock, faCubes } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import Login, { action as loginAction } from './Login';
import { action as logoutAction } from './Logout';
import { NavItem, NavRouteObject } from '../types/routeTypes';
import { lazy, Suspense } from 'react';
import { checkTokenLoader, rootLoader } from '../utils/auth';
import NotFound from './NotFound';
import { ConfigProvider, theme } from 'antd';
import { useThemeStatus } from '../hooks/useThemeStatus';

const Dashboard = lazy(() => import('./Dashboard'));
const Documentation = lazy(() => import('./Documentation'));

const getNavItems: () => NavItem[] = () => {
  return homeRoutes.map(({ pathForLink, icon, displayName, children }) => {
    if (children) {
      return {
        pathForLink,
        icon,
        displayName,
        children: children.map(({ pathForLink, parentForLink, icon, displayName }) => ({
          pathForLink,
          parentForLink,
          icon,
          displayName,
        })),
      };
    }
    return { pathForLink, icon, displayName };
  });
};

const permissionChildrenRoutes: NavRouteObject[] = [
  {
    path: 'route',
    pathForLink: '/permission/route',
    parentForLink: '/permission',
    element: <h1>看到此页面代表你已经登录了</h1>,
    displayName: '路由',
  },
  {
    path: '404',
    pathForLink: '/permission/404',
    parentForLink: '/permission',
    element: <NotFound />,
    displayName: '404',
  },
];

const componentChildrenRoutes: NavRouteObject[] = [
  {
    path: 'form',
    pathForLink: '/component/form',
    parentForLink: '/component',
    element: <h1>route</h1>,
    displayName: '表单',
  },
  {
    path: 'table',
    pathForLink: '/component/table',
    parentForLink: '/component',
    element: <h1>404</h1>,
    displayName: '表格',
  },
  {
    path: 'search',
    pathForLink: '/component/search',
    parentForLink: '/component',
    element: <h1>404</h1>,
    displayName: '查询',
  },
  {
    path: 'aside',
    pathForLink: '/component/aside',
    parentForLink: '/component',
    element: <h1>404</h1>,
    displayName: '侧边栏',
  },
  {
    path: 'tabs',
    pathForLink: '/component/tabs',
    parentForLink: '/component',
    element: <h1>404</h1>,
    displayName: '选项卡',
  },
  {
    path: 'radio-cards',
    pathForLink: '/component/radio-cards',
    parentForLink: '/component',
    element: <h1>404</h1>,
    displayName: '单选项卡',
  },
];

const homeRoutes: NavRouteObject[] = [
  {
    index: true,
    pathForLink: '/',
    element: (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Dashboard />
      </Suspense>
    ),
    icon: faHome,
    displayName: '首页',
  },
  {
    path: 'documentation',
    pathForLink: '/documentation',
    element: (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Documentation />
      </Suspense>
    ),
    icon: faFileLines,
    displayName: '文档',
  },
  {
    path: 'guide',
    pathForLink: '/guide',
    element: <h1>home</h1>,
    icon: faDiamondTurnRight,
    displayName: '引导',
  },
  {
    path: 'permission',
    pathForLink: '/permission',
    icon: faUserLock,
    displayName: '权限',
    children: [...permissionChildrenRoutes],
  },
  {
    path: 'component',
    pathForLink: '/component',
    element: <h1>home</h1>,
    icon: faCubes,
    displayName: '组件',
    children: [...componentChildrenRoutes],
  },
];

const router = createBrowserRouter([
  {
    id: 'Root',
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: <App navItems={getNavItems()} />,
        loader: checkTokenLoader,
        children: [
          ...homeRoutes,
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/logout',
        action: logoutAction,
      },
    ],
  },
]);

const Routes = () => {
  const isDark = useThemeStatus();

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#13c2c2' },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default Routes;
