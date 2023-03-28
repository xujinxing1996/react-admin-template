import { useEffect, useState } from 'react';
import Overview from './components/Overview';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(!loading), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Overview loading={loading} />
    </>
  );
};

export default Dashboard;
