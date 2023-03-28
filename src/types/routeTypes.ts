import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

export type NavItem = {
  pathForLink: string;
  displayName: string;
  icon?: IconDefinition;
  children?: NavItem[];
  parentForLink?: string;
};

type NavIndexRouteObject = NavItem & IndexRouteObject;
type NavNonIndexRouteObject = NavItem & NonIndexRouteObject;

export type NavRouteObject = NavIndexRouteObject | NavNonIndexRouteObject;
