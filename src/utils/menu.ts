import { NavItem } from '../types/routeTypes';

export const spreadNav = (navItems: NavItem[]): NavItem[] => {
  return navItems.reduce<NavItem[]>((prev, next) => {
    if (next.children) {
      return prev.concat(spreadNav(next.children));
    }
    return [...prev, next];
  }, []);
};
