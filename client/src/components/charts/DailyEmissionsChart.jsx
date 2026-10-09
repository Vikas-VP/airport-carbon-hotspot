import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatDate } from '../../utils/formatters';

const ChartContainer = styled.div`
  width: 100%;
  height: 320px;
`;

const CustomTooltipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

const TooltipDate = styled.div`
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
        <TooltipDate>{formatDate(label)}</TooltipDate>
        {payload.map((entry, index) => (
          <TooltipRow key={`item-${index}`}>
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="value">{entry.value} kg CO2</span>
          </TooltipRow>
        ))}
      </CustomTooltipBox>
    );
  }
  return null;
}

export function DailyEmissionsChart({ data = [] }) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No daily emissions telemetry available</div>;
  }

  const formattedData = data.map((d) => ({
    ...d,
    displayDate: d.date.slice(5) // e.g. "10-01"
  }));

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.colors.secondary} stopOpacity={0.4} />
              <stop offset="95%" stopColor={theme.colors.secondary} stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorAvoidable" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.colors.danger} stopOpacity={0.5} />
              <stop offset="95%" stopColor={theme.colors.danger} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} opacity={0.6} />
          <XAxis
            dataKey="displayDate"
            stroke={theme.colors.textMuted}
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke={theme.colors.textMuted}
            fontSize={12}
            tickLine={false}
            unit=" kg"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '10px', fontSize: '13px' }}
          />
          <Area
            type="monotone"
            dataKey="totalCo2Kg"
            name="Total Idling CO2"
            stroke={theme.colors.secondary}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
          <Area
            type="monotone"
            dataKey="avoidableCo2Kg"
            name="Potentially Avoidable CO2"
            stroke={theme.colors.danger}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAvoidable)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default DailyEmissionsChart;

