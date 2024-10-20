import React from 'react';
import { useSelector } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DetailedSummary = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { hourlyTemp } = useSelector((state) => state.location);

  return (
    <div
      className={`p-4 rounded-lg shadow-lg overflow-x-auto scrollbar-none ${
        theme === 'dark' ? 'bg-gray-700 text-white scrollbar-thumb-gray-600' : 'bg-gray-200 text-black scrollbar-thumb-gray-400'
      }`}
      style={{ whiteSpace: 'nowrap' }}
    >
      <h3 className="text-xl font-semibold mb-4 ml-5">24-Hour Temperature Summary</h3>
      
      <div style={{ width: '800px', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={hourlyTemp}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF0000" stopOpacity={0.4} /> {/* Red for hot */}
                <stop offset="100%" stopColor="#0000FF" stopOpacity={0.4} /> {/* Blue for cool */}
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke={theme === 'dark' ? '#fff' : '#000'} />
            <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
            <Tooltip content={<CustomTooltip />} />

            {/* Area with gradient */}
            <Area
              type="monotone"
              dataKey="temp"
              stroke="url(#tempGradient)"
              fill="url(#tempGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded shadow-lg">
        <p className="text-black">{`Time: ${payload[0].payload.time}`}</p>
        <p className="text-black">{`Temperature: ${payload[0].value}°C`}</p>
      </div>
    );
  }

  return null;
};

export default DetailedSummary;
