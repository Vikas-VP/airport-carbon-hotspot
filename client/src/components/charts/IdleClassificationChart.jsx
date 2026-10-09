import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const CustomTooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.5rem 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span.count {
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-family: ${({ theme }) => theme.typography.monoFontFamily};
  }
`;

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <CustomTooltipBox>
        <span style={{ color: item.payload.color }}>{item.name}:</span>
        <span className="count">{item.value} events</span>
      </CustomTooltipBox>
    );
  }
  return null;
}

export function IdleClassificationChart({ data = [] }) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No classification data available</div>;
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default IdleClassificationChart;

