import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ChartContainer = styled.div`
  width: 100%;
  height: 260px;
`;

const CustomTooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipBox>
        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{label}</div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span style={{ fontWeight: 600 }}>{entry.value}</span>
          </div>
        ))}
      </CustomTooltipBox>
    );
  }
  return null;
}

export function BaselineComparisonChart({ comparison }) {
  const theme = useTheme();

  if (!comparison) return null;

  const data = [
    {
      metric: 'Avg Idle (Mins)',
      'Identified Hotspot': comparison.hotspotAvgIdleMinutes,
      'Airport Overall Baseline': comparison.airportAvgIdleMinutes
    },
    {
      metric: 'Avoidable Idling %',
      'Identified Hotspot': comparison.hotspotAvoidablePercent,
      'Airport Overall Baseline': comparison.airportAvoidablePercent
    }
  ];

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} opacity={0.6} />
          <XAxis
            dataKey="metric"
            stroke={theme.colors.textMuted}
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke={theme.colors.textMuted}
            fontSize={12}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '13px' }} />
          <Bar
            dataKey="Identified Hotspot"
            fill={theme.colors.danger}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Airport Overall Baseline"
            fill={theme.colors.secondary}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default BaselineComparisonChart;

