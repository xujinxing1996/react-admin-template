import { Avatar, List, Tag } from 'antd';

const data = [
  {
    title: '你收到了 14 份新周报',
    description: '2017-08-09',
  },
  {
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    description: '2017-08-09',
  },
  {
    title: '这种模板可以区分多种通知类型',
    description: '2017-08-09',
  },
  {
    title: '左侧图标用于区分不同的类型',
    description: '2017-08-09',
  },
];

type MessagesProps = {
  hasStatus?: boolean;
};

const Messages = ({ hasStatus }: MessagesProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={!hasStatus && <Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={
              !hasStatus ? (
                <a href="https://ant.design">{item.title}</a>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a href="https://ant.design">{item.title}</a>
                  <Tag color="success">成功</Tag>
                </div>
              )
            }
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default Messages;
