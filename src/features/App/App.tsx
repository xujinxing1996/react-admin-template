import { Layout, MenuProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './components/Header';
import { NavItem } from '../../types/routeTypes';
import SidebarNav from './components/SidebarNav';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import TagView from './components/TagView';
import tagsReducer, { EActionType, Tag } from './reducers/tagsReducer';
import { contentStyles } from './App.styles';
import { spreadNav } from '../../utils/menu';
import useGuide from '../../hooks/useGuide';

export type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

type AppProps = {
  navItems: NavItem[];
};

const App = ({ navItems }: AppProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const guide = useGuide();
  const [collapsed, setCollapsed] = useState(false);
  const [tags, dispatch] = useReducer(tagsReducer, [{ key: '/', label: '首页', closable: false }]);
  const [selectedKeys, setSelectedKeys] = useState(['/']);
  const [openKeys, setOpenKeys] = useState(['']);

  useEffect(() => guide?.start(), []);

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuList: MenuItem[] = navItems.map((nav) => {
    return getItem(
      nav.displayName,
      nav.pathForLink,
      nav.icon && <FontAwesomeIcon icon={nav.icon} />,
      nav.children?.map((item) => getItem(item.displayName, item.pathForLink))
    );
  });

  // 页面重新加载的时候处理tag
  useEffect(() => {
    const spreadNavItems = spreadNav(navItems);
    const currentNav = spreadNavItems.find((nav) => nav.pathForLink === location.pathname);
    if (currentNav) {
      dispatch({ type: EActionType.ADD, payload: { key: currentNav.pathForLink, label: currentNav.displayName } });
      setSelectedKeys([currentNav.pathForLink]);
      currentNav.parentForLink && setOpenKeys([currentNav.parentForLink]);
    }
  }, [navItems]);

  const rootSubmenuKeys = menuList.map((item) => item?.key);

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys?.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleChangeActiveKey = (key: string, keyPath?: string[]) => {
    setSelectedKeys([key]);
    if (keyPath) {
      setSelectedKeys(keyPath);
      setOpenKeys(keyPath.slice(-1));
    }
    navigate(key);
  };

  const handleAddTag = (tag: Tag) => {
    dispatch({ type: EActionType.ADD, payload: tag });
  };

  const handleRemoveTag = (type: EActionType, tag: Omit<Tag, 'label'> | null) => {
    switch (type) {
      case EActionType.DELETE:
        tag && dispatch({ type: EActionType.DELETE, payload: tag });
        break;
      case EActionType.DELETE_ALL:
        dispatch({ type: EActionType.DELETE_ALL, payload: null });
        break;
      case EActionType.DELETE_OTHER:
        tag && dispatch({ type: EActionType.DELETE_OTHER, payload: tag });
        break;
      default:
        throw Error('Unknown action');
    }
  };

  return (
    <Layout>
      <Header collapsed={collapsed} onToggleCollapsed={handleToggleCollapsed} />
      <Layout>
        <Layout.Sider collapsed={collapsed} width={200}>
          <SidebarNav
            navItems={menuList}
            selectedKeys={selectedKeys}
            onChangeActiveKey={handleChangeActiveKey}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            onAddTag={handleAddTag}
          />
        </Layout.Sider>
        <Layout.Content css={contentStyles}>
          <TagView
            tags={tags}
            activeKey={selectedKeys[0]}
            onChangeActiveKey={handleChangeActiveKey}
            onRemoveTag={handleRemoveTag}
          />
          <div className="body">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
export default App;
