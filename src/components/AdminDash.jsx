import React from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import StatsCard from './StatsCard';
import DestinationCard from './DestinationCard';
import TripTable from './TripTable';
import "@/styles/dashboard.css";
const AdminDash = () => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        <TopBar title={"Dashboard"} />
        <div className="content-body">
          <StatsCard />
          <DestinationCard />
         <TripTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
