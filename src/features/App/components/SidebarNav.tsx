import { Menu, MenuProps } from 'antd';
import { Tag } from '../reducers/tagsReducer';

type SidebarNavProps = {
  navItems: MenuProps['items'];
  selectedKeys: string[];
  onChangeActiveKey: (key: string, keyPath: string[]) => void;
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;
  onAddTag: (tag: Tag) => void;
};

const SidebarNav = ({
  navItems,
  selectedKeys,
  onChangeActiveKey,
  openKeys,
  onOpenChange,
  onAddTag,
}: SidebarNavProps) => {
  const onOpenClick: MenuProps['onClick'] = ({ domEvent, key, keyPath }) => {
    const title = (domEvent.target as HTMLSpanElement).textContent;
    title && onAddTag({ key, label: title });
    onChangeActiveKey(key, keyPath);
  };

  return (
    <Menu
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
      onClick={onOpenClick}
      items={navItems}
    />
  );
};

export default SidebarNav;
