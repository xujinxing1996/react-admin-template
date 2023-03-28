import { css } from '@emotion/react';
import { Dropdown, MenuProps, Tabs, TabsProps } from 'antd';
import { EActionType, Tag } from '../reducers/tagsReducer';

const tagStyles = css`
  padding: 6px;
  .ant-tabs-nav {
    margin-bottom: 0;

    .ant-tabs-tab {
      padding: 0;

      .ant-tabs-tab-remove {
        margin: 0 8px 0 -8px;
        padding: 0;
      }
    }
  }
`;

type TagViewProps = {
  tags: TabsProps['items'];
  activeKey: string;
  onChangeActiveKey: (key: string, keyPath?: string[]) => void;
  onRemoveTag: (type: EActionType, tag: Omit<Tag, 'label'> | null) => void;
};

const TagView = ({ tags = [], activeKey, onChangeActiveKey, onRemoveTag }: TagViewProps) => {
  const changeActiveKey = (key: string) => {
    if (key === activeKey) return;
    const strArray = key.split('/');
    onChangeActiveKey(key, strArray.length > 2 ? [key, '/' + strArray[1]] : [key]);
  };

  const handleChangeTag: TabsProps['onTabClick'] = (key: string) => {
    changeActiveKey(key);
  };

  const handleRemoveTag: TabsProps['onEdit'] = (targetKey) => {
    const removeIndex = tags.findIndex((tag) => tag.key === (targetKey as string));

    // change activeKey
    if (targetKey === activeKey && tags) {
      const key = tags[removeIndex - 1].key;
      changeActiveKey(key);
    }

    onRemoveTag(EActionType.DELETE, { key: targetKey as string });
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'close',
      label: '关闭',
      disabled: activeKey === '/',
    },
    {
      key: 'closeOther',
      label: '关闭其他',
    },
    {
      key: 'closeAll',
      label: '全部关闭',
      disabled: activeKey === '/',
    },
  ];

  const handleClickMenuItem: MenuProps['onClick'] = ({ key, domEvent }) => {
    if (key === 'close') {
      handleRemoveTag(activeKey, 'remove');
    } else if (key === 'closeOther') {
      onRemoveTag(EActionType.DELETE_OTHER, { key: activeKey });
    } else {
      changeActiveKey('/');
      onRemoveTag(EActionType.DELETE_ALL, null);
    }
    domEvent.stopPropagation();
  };

  const dropdownNavTags = tags.map((nav) => ({
    ...nav,
    label: (
      <Dropdown menu={{ items: menuItems, onClick: handleClickMenuItem }} trigger={['contextMenu']}>
        <div style={{ padding: '8px 16px' }}>{nav.label}</div>
      </Dropdown>
    ),
  }));

  return (
    <Tabs
      css={tagStyles}
      activeKey={activeKey}
      type="editable-card"
      onTabClick={handleChangeTag}
      onEdit={handleRemoveTag}
      hideAdd
      items={dropdownNavTags}
    />
  );
};

export default TagView;
