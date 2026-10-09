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
  height: 280px;
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
            <span className="value">{entry.value}</span>
          </TooltipRow>
        ))}
      </CustomTooltipBox>
    );
  }
  return null;
}

export function BeforeAfterChart({ before, after }) {
  const theme = useTheme();

  if (!before || !after) {
    return <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Awaiting simulation inputs</div>;
  }

  const chartData = [
    {
      metric: 'CO2 Emissions (kg)',
      Before: before.co2Kg,
      After: after.co2Kg
    },
    {
      metric: 'Fuel Burn (L)',
      Before: before.fuelLiters,
      After: after.fuelLiters
    },
    {
      metric: 'Idle Time (hrs)',
      Before: Number((before.idleMinutes / 60).toFixed(1)),
      After: Number((after.idleMinutes / 60).toFixed(1))
    }
  ];

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
            dataKey="Before"
            name="Baseline (Before)"
            fill={theme.colors.danger}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="After"
            name="Simulated (After)"
            fill={theme.colors.primary}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default BeforeAfterChart;

