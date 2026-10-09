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
import { formatMinutes } from '../../utils/formatters';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const CustomTooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

const TooltipTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TooltipRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span.value {
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-family: ${({ theme }) => theme.typography.monoFontFamily};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipBox>
        <TooltipTitle>{label}</TooltipTitle>
        {payload.map((entry, index) => (
          <TooltipRow key={`item-${index}`}>
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="value">{formatMinutes(entry.value)}</span>
          </TooltipRow>
        ))}
      </CustomTooltipBox>
    );
  }
  return null;
}

export function VehicleTypeChart({ data = [] }) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No fleet type data available</div>;
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 10, left: 30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} opacity={0.6} />
          <XAxis
            type="number"
            stroke={theme.colors.textMuted}
            fontSize={12}
            tickLine={false}
            unit="m"
          />
          <YAxis
            type="category"
            dataKey="vehicleType"
            stroke={theme.colors.textMuted}
            fontSize={11}
            tickLine={false}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '13px' }} />
          <Bar
            dataKey="totalIdleMinutes"
            name="Total Idle"
            fill={theme.colors.primary}
            radius={[0, 4, 4, 0]}
          />
          <Bar
            dataKey="avoidableIdleMinutes"
            name="Avoidable Idle"
            fill={theme.colors.danger}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default VehicleTypeChart;

