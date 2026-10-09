import React from 'react';
import styled from 'styled-components';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatDateTime, formatMinutes, formatCo2 } from '../../utils/formatters';
import { Clock, Fuel, ShieldCheck, MapPin, Truck } from 'lucide-react';

const RecordCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  ${({ $isExcessive, theme }) =>
    $isExcessive &&
    `border-left: 4px solid ${theme.colors.danger};`}
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const VehicleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const TimeLocation = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.75rem;
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.75rem;
`;

const MetricCol = styled.div`
  display: flex;
  flex-direction: column;

  span.label {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.65rem;
    text-transform: uppercase;
  }
  span.val {
    font-weight: 600;
    font-family: ${({ theme }) => theme.typography.monoFontFamily};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ExceptionBox = styled.div`
  margin-top: 0.5rem;
  padding: 0.4rem 0.6rem;
  background-color: ${({ theme }) => (theme.name === 'dark' ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF')};
  border: 1px solid #C7D2FE;
  border-radius: ${({ theme }) => theme.radius.xs};
  font-size: 0.75rem;
  color: #4F46E5;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

export function MobileOperationCard({ record }) {
  const isExcessive = record.classification === 'Excessive';
  const badgeVariant = record.isOperationalException
    ? 'info'
    : record.classification === 'Excessive'
    ? 'danger'
    : record.classification === 'Review'
    ? 'warning'
    : 'success';

  return (
    <RecordCard $isExcessive={isExcessive}>
      <CardTop>
        <VehicleInfo>
          <Truck size={16} color="#0D9488" />
          <span>{record.vehicleId}</span>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 400 }}>({record.vehicleType})</span>
        </VehicleInfo>
        <Badge $variant={badgeVariant} $size="sm">
          {record.isOperationalException ? 'Exception' : record.classification}
        </Badge>
      </CardTop>

      <TimeLocation>
        <div>{formatDateTime(record.timestamp)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <MapPin size={12} />
          <span>Terminal {record.terminalId} • Gate {record.gateId}</span>
        </div>
      </TimeLocation>

      <MetricsRow>
        <MetricCol>
          <span className="label">Idle Time</span>
          <span className="val">{formatMinutes(record.idleMinutes)}</span>
        </MetricCol>
        <MetricCol>
          <span className="label">Est. CO2</span>
          <span className="val">{formatCo2(record.estimatedCo2Kg)}</span>
        </MetricCol>
        <MetricCol>
          <span className="label">Avoidable CO2</span>
          <span className="val" style={{ color: record.avoidableCo2Kg > 0 ? '#E11D48' : 'inherit' }}>
            {formatCo2(record.avoidableCo2Kg)}
          </span>
        </MetricCol>
      </MetricsRow>

      {record.isOperationalException && (
        <ExceptionBox>
          <ShieldCheck size={14} />
          <span>Zero-rated: {record.exceptionReason}</span>
        </ExceptionBox>
      )}
    </RecordCard>
  );
}

export default MobileOperationCard;

