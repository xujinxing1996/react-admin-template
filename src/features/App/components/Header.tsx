import { css } from '@emotion/react';
import { Layout, Tooltip, Popover, Dropdown, MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import ReactSvg from '../assets/logo/react.svg';
import AntdSvg from '../assets/logo/antd.svg';
import Avator from '../assets/header/avator.png';
import { ReactComponent as MoonSvg } from '../assets/header/moon.svg';
import { ReactComponent as SunSvg } from '../assets/header/sun.svg';
import { ReactComponent as NoticeSvg } from '../assets/header/notice.svg';
import { ReactComponent as LanguageSvg } from '../assets/header/language.svg';
import { ReactComponent as ZhCnSvg } from '../assets/header/zh_CN.svg';
import { ReactComponent as EnUsSvg } from '../assets/header/en_US.svg';
import NoticeList from './NoticeList';
import { Link, useSubmit } from 'react-router-dom';
import { useThemeStatus } from '../../../hooks/useThemeStatus';
import { useDispatch } from 'react-redux';
import { setGlobalState } from '../appSlice';

const headerStyles = css`
  z-index: 1;
  box-shadow: 0 4px 10px #dddddd;

  svg {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
`;

const logoStyles = css`
  height: 64px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    :first-of-type {
      margin-right: 20px;
    }

    width: 30px;
    height: 30px;
  }
`;

const headerMainStyles = css`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const collapsedStyles = css``;

const actionStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin-left: 30px;
    display: flex;
    align-items: center;
  }

  .user-action {
    cursor: pointer;

    .user-avator {
      margin-right: 8px;
      width: 40px;
      height: 40px;
    }
  }
`;

type HeaderProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

const Header = ({ collapsed, onToggleCollapsed }: HeaderProps) => {
  const submit = useSubmit();
  const dispatch = useDispatch();
  const isDark = useThemeStatus();

  const languageItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          简体中文
        </a>
      ),
      icon: <ZhCnSvg />,
      disabled: true,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          English
        </a>
      ),
      icon: <EnUsSvg />,
    },
  ];

  const userItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/logout">个人设置</Link>,
      icon: <FontAwesomeIcon icon={faGear} />,
      disabled: true,
    },
    {
      key: '2',
      label: <span>退出登录</span>,
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      onClick: () => submit(null, { method: 'post', action: '/logout' }),
    },
  ];

  const handleChangeTheme = () => {
    const theme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    dispatch(setGlobalState({ theme }));
  };

  return (
    <Layout.Header css={headerStyles} style={{ display: 'flex', backgroundColor: '#fff', padding: 0 }}>
      <div css={logoStyles}>
        <img src={ReactSvg} alt="" />
        <img src={AntdSvg} alt="" />
      </div>
      <div css={headerMainStyles}>
        <span id="sidebar-trigger" onClick={onToggleCollapsed} css={collapsedStyles}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        <div css={actionStyles}>
          <Tooltip title={isDark ? '切换至浅色主题' : '切换至深色主题'}>
            <div onClick={handleChangeTheme}>{isDark ? <SunSvg /> : <MoonSvg />}</div>
          </Tooltip>

          <Tooltip title="通知">
            <Popover content={<NoticeList />} trigger="click">
              <div id="notice-center">
                <NoticeSvg />
              </div>
            </Popover>
          </Tooltip>

          <Dropdown menu={{ items: languageItems }} placement="bottom">
            <div id="language-change">
              <LanguageSvg />
            </div>
          </Dropdown>

          <div className="user-action">
            <Dropdown menu={{ items: userItems }}>
              <img src={Avator} className="user-avator" />
            </Dropdown>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};
export default Header;
