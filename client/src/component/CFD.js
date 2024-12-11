// CFDChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required components from Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const CFDChart = ({ data }) => {
  // Prepare data for Chart.js
  const chartData = {
    labels: data.map((item) => item.date), // Dates or time periods for the x-axis
    datasets: [
      {
        label: 'Cumulative Flow',
        data: data.map((item) => item.value), // Cumulative data points
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false, // Set to true to fill the area under the line
        tension: 0.4, // Optional: for smoother lines
        pointRadius: 4, // Optional: set the size of the points
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Optional: color of the points
      }
    ],
  };
  
  // Chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative Count'
        },
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
  };

  return (
    <div>
      <h2>Cumulative Flow Diagram</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CFDChart;
