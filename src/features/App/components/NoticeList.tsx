import { Tabs, TabsProps } from 'antd';
import Messages from './Messages';
import { css } from '@emotion/react';

const tabsStyles = css`
  min-width: 300px;
  max-height: 50vh;
  overflow-y: scroll;
`;

const NoticeList = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '通知(5)',
      children: <Messages />,
    },
    {
      key: '2',
      label: '消息(3)',
      children: <Messages />,
    },
    {
      key: '3',
      label: '代办(4)',
      children: <Messages hasStatus />,
    },
  ];

  return <Tabs css={tabsStyles} items={items} />;
};

export default NoticeList;
