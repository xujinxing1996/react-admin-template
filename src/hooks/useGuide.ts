import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { useEffect } from 'react';

const useGuide = () => {
  const driver = new Driver({
    keyboardControl: false,
    allowClose: false,
    overlayClickNext: true,
    closeBtnText: '关闭',
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    doneBtnText: '结束',
  });
  useEffect(() => {
    driver.defineSteps([
      {
        element: '#sidebar-trigger',
        popover: {
          title: 'Siderbar开关',
          description: '打开和关闭Siderbar',
          position: 'bottom',
          offset: 10,
          isFirst: true,
        },
      },
      {
        element: '#notice-center',
        popover: {
          title: '通知中心',
          description: '所有通知消息都会显示在这里',
          position: 'bottom',
          offset: -160,
        },
      },
      {
        element: '#language-change',
        popover: {
          title: '切换语言',
          description: '你可以点击这里来切换语言',
          position: 'bottom',
          offset: -170,
        },
      },
    ]);
    localStorage.setItem('newUser', 'false');
  }, []);
  const isNewUser = !localStorage.getItem('newUser');

  return isNewUser ? driver : null;
};

export default useGuide;
