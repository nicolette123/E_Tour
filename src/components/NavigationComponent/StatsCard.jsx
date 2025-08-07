import React from 'react';
import "../../styles/statscard.css";

const mockData = {
  totalTrips: 100,
  agents: 10,
  totalClients: 150,
  amountMoney: "rwf1,000"
};

const StatsCard = ({ data }) => {
  return (
    <div className="stats-card">
      <div className="grid-container">
        <div className="grid-item">
          <h4>
            <i className="ri-group-fill"></i> Total Trips
          </h4>
          <p>{data.totalTrips}</p>
        </div>
        <div className="grid-item">
          <h4>
            <i className="ri-user-fill"></i> Agents
          </h4>
          <p>{data.agents}</p>
        </div>
        <div className="grid-item">
          <h4>
            <i className="ri-heart-3-fill"></i> Total Clients
          </h4>
          <p>{data.totalClients}</p>
        </div>
        <div className="grid-item">
          <h4>
            <i className="ri-money-dollar-circle-fill"></i> Amount Money
          </h4>
          <p>{data.amountMoney}</p>
        </div>
      </div>
    </div>
  );
};

export default () => <StatsCard data={mockData} />;