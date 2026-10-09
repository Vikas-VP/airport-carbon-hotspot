import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { formatMinutes, formatCo2, formatPercent } from '../../utils/formatters';
import { Activity, Clock, AlertCircle, Gauge, FileText, CloudRain } from 'lucide-react';
import { media } from '../../styles/breakpoints';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const EvidenceItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.danger : theme.colors.textPrimary)};
  font-feature-settings: 'tnum';
  margin-top: 0.25rem;
`;

const Note = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
`;

export function HotspotEvidence({ evidence }) {
  if (!evidence) return null;

  return (
    <Card style={{ marginBottom: '1.5rem' }}>
      <CardHeader>
        <CardTitle>
          <Activity size={18} color="#0D9488" />
          <span>Empirical Operational Evidence</span>
        </CardTitle>
      </CardHeader>

      <Grid>
        <EvidenceItem>
          <HeaderRow>
            <Label>Monitored Activities</Label>
            <FileText size={16} color="#64748B" />
          </HeaderRow>
          <Value>{evidence.analyzedRecordsCount}</Value>
          <Note>Recorded turnarounds at this gate</Note>
        </EvidenceItem>

        <EvidenceItem>
          <HeaderRow>
            <Label>Excessive Idling Events</Label>
            <AlertCircle size={16} color="#E11D48" />
          </HeaderRow>
          <Value $highlight>{evidence.excessiveEventsCount}</Value>
          <Note>{evidence.breachFrequencyPercent}% of all observed events</Note>
        </EvidenceItem>

        <EvidenceItem>
          <HeaderRow>
            <Label>Average Idle Duration</Label>
            <Clock size={16} color="#64748B" />
          </HeaderRow>
          <Value>{evidence.averageIdleDuration} min</Value>
          <Note>Max observed: {evidence.maxIdleDuration} min</Note>
        </EvidenceItem>

        <EvidenceItem>
          <HeaderRow>
            <Label>Permitted Operational Limit</Label>
            <Gauge size={16} color="#10B981" />
          </HeaderRow>
          <Value>{evidence.allowedIdleThreshold} min</Value>
          <Note>Baseline ground threshold</Note>
        </EvidenceItem>

        <EvidenceItem>
          <HeaderRow>
            <Label>Total Idle Minutes</Label>
            <Clock size={16} color="#64748B" />
          </HeaderRow>
          <Value>{formatMinutes(evidence.totalIdleMinutes)}</Value>
          <Note>Cumulative engine runtime</Note>
        </EvidenceItem>

        <EvidenceItem>
          <HeaderRow>
            <Label>Avoidable Idle Time</Label>
            <AlertCircle size={16} color="#E11D48" />
          </HeaderRow>
          <Value $highlight>{formatMinutes(evidence.totalAvoidableMinutes)}</Value>
          <Note>Minutes beyond allowed threshold</Note>
        </EvidenceItem>

        <EvidenceItem>
          <HeaderRow>
            <Label>Current Idling Emissions</Label>
            <CloudRain size={16} color="#64748B" />
          </HeaderRow>
          <Value>{formatCo2(evidence.currentEmissionsKg)}</Value>
          <Note>Total diesel combustion output</Note>
        </EvidenceItem>

        <EvidenceItem>
          <HeaderRow>
            <Label>Avoidable Carbon Hotspot</Label>
            <AlertCircle size={16} color="#E11D48" />
          </HeaderRow>
          <Value $highlight>{formatCo2(evidence.avoidableEmissionsKg)}</Value>
          <Note>{formatPercent(evidence.percentageAvoidable)} of hotspot emissions</Note>
        </EvidenceItem>
      </Grid>
    </Card>
  );
}

export default HotspotEvidence;

