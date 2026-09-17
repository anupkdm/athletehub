import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export const PerformanceChart = ({ stats = {} }) => {
  const data = [
    { metric: 'Sprint Speed', value: stats.sprintSpeedKmh ? Math.min(stats.sprintSpeedKmh * 2.8, 100) : 85 },
    { metric: 'Vertical Jump', value: stats.verticalJumpCm ? Math.min(stats.verticalJumpCm * 1.2, 100) : 80 },
    { metric: 'Stamina Index', value: stats.staminaIndex || 88 },
    { metric: 'Agility', value: stats.agilityScore || 82 },
    { metric: 'Overall Rating', value: stats.overallScore || 90 }
  ];

  return (
    <div style={{ width: '100%', height: '260px', marginTop: '0.5rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />
          <PolarAngleAxis dataKey="metric" stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.1)" />
          <Radar name="Performance Score" dataKey="value" stroke="#0284c7" fill="#0284c7" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
