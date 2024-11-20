import React, { useState, useEffect } from 'react';
import './VisitorsAnalytics.css'; // Styles for the analytics page
import { Line } from 'react-chartjs-2'; // Chart.js for the graph
import 'chart.js/auto';

const VisitorsAnalytics = ({ onResetStats }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [clicksData, setClicksData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  const filterOptions = ['All','Today', 'This Week', 'This Month', 'This Year'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/get-total-clicks');
        const data = await response.json();

        // Correctly access totalClicks and clicksByDate from the nested 'stats' object
        const stats = data.stats;
        setClicksData(stats.clicksByDate || {});
        setTotalClicks(stats.totalClicks || 0);
        setFilteredData(Object.entries(stats.clicksByDate || {})); // Initial data for graph
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, []);

  // Filter logic based on selected filter
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const oneDayMs = 24 * 60 * 60 * 1000;
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)).toISOString().split('T')[0];
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];

    const filtered = Object.entries(clicksData).filter(([date]) => {
      if (filter === 'Today') return date === today;
      if (filter === 'This Week') return date >= startOfWeek && date <= today;
      if (filter === 'This Month') return date >= startOfMonth && date <= today;
      if (filter === 'This Year') return date >= startOfYear && date <= today;
      return true; // For 'All', this will match all dates
    });

    setFilteredData(filtered);
  };

  // Prepare data for the graph
  const graphData = {
    labels: filteredData.map(([date]) => date),
    datasets: [
      {
        label: 'Visitors',
        data: filteredData.map(([, clicks]) => clicks),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Total clicks logic for display
  const totalClicksToDisplay =
    selectedFilter === 'All'
      ? totalClicks // Show totalClicks directly for 'All'
      : filteredData.reduce((sum, [, clicks]) => sum + clicks, 0); // Sum clicks for other filters

  return (
    <div className='visitorsAnalyticsWrapper'>
     <div className='visitorwrapper'>
      <h1>Visitor Analytics</h1>
      <button className='resetStatsBtn' onClick={onResetStats}>
        Reset All Stats
      </button>

      <div className='graphWrapper'>
        <Line data={graphData} />
      </div>

      <div className='filterOptions'>
        <h3>Stats for :</h3>
        <div className='filters'>
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={`filterBtn ${selectedFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className='filteredStats'>
        <h2>
          Total Visitors for {selectedFilter} : {totalClicksToDisplay}
        </h2>
      </div></div>
    </div>
  );
};

export default VisitorsAnalytics;
