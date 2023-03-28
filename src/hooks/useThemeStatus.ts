import { useSyncExternalStore } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '../features/App/appSlice';

export const useThemeStatus = () => {
  const systemTheme = useSyncExternalStore(subscribe, getSnapshot);
  const userTheme = useSelector(selectCurrentTheme);
  const currentTheme = userTheme || systemTheme;
  const isDark = currentTheme === 'dark';
  return isDark;
};

const mql = window.matchMedia('(prefers-color-scheme: dark)');

const subscribe = (callback: () => void) => {
  mql.addEventListener('change', callback);
  return () => {
    mql.removeEventListener('change', callback);
  };
};

const getSnapshot = () => {
  return mql.matches ? 'dark' : 'light';
};
