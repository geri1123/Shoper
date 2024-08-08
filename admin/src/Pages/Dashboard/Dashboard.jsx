import React, { useContext } from 'react';
import './Dashboard.css';
import DashboardPrice from '../../Components/DashboardTools/DashboardPrice';
import DashboardItemsnr from '../../Components/DashboardTools/DashboardItemsnr';

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <DashboardPrice/>
        <DashboardItemsnr/>
    </div>
  );
};

export default Dashboard;