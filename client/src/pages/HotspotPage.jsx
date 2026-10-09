import React, { useState } from 'react';
import styled from 'styled-components';
import { useAirport } from '../context/AirportContext';
import { useHotspot } from '../hooks/useHotspot';
import { useSimulation } from '../hooks/useSimulation';
import { PageHeader } from '../components/common/PageHeader';
import { HotspotBanner } from '../components/hotspot/HotspotBanner';
import { HotspotEvidence } from '../components/hotspot/HotspotEvidence';
import { RecommendationCard } from '../components/hotspot/RecommendationCard';
import { SimulationPanel } from '../components/hotspot/SimulationPanel';
import { AssumptionsPanel } from '../components/hotspot/AssumptionsPanel';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { Skeleton } from '../components/common/LoadingSkeleton';
import { BaselineComparisonChart } from '../components/charts/BaselineComparisonChart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  FileText,
  HelpCircle,
  TrendingUp,
  BarChart3,
  Scale,
  Printer,
  RotateCcw
} from 'lucide-react';
import { media } from '../styles/breakpoints';

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const ExplanationCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ExplanationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ExplanationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
  }
`;

export function HotspotPage() {
  const { selectedAirportId, selectedAirport } = useAirport();
  const { hotspot, loading, error, refetch } = useHotspot(selectedAirportId);
  const {
    targetIdleMinutes,
    setTargetIdleMinutes,
    simulation,
    loading: simLoading,
    resetTarget
  } = useSimulation(selectedAirportId, 15);

  if (loading) {
    return (
      <div>
        <Skeleton $height="3rem" $width="50%" $margin="0 0 1.5rem 0" />
        <Skeleton $height="220px" $radius="16px" $margin="0 0 1.5rem 0" />
        <Skeleton $height="180px" $radius="16px" $margin="0 0 1.5rem 0" />
        <TwoColumnGrid>
          <Skeleton $height="320px" $radius="16px" />
          <Skeleton $height="320px" $radius="16px" />
        </TwoColumnGrid>
      </div>
    );
  }

  if (error || !hotspot) {
    return (
      <ErrorState
        title="Hotspot Telemetry Unavailable"
        message={error || 'Unable to identify operational hotspots for this airport.'}
        onRetry={refetch}
      />
    );
  }

  const { banner, evidence, patternVisualization, explanation, recommendation, assumptions } = hotspot;

  return (
    <div>
      <PageHeader
        title={`Carbon Hotspot Analysis: ${selectedAirport?.name || 'Airport'}`}
        subtitle="Ranked primary stationary idling hotspot requiring targeted operational intervention"
        badgeText={`Highest Rank • ${banner.terminal} Gate ${banner.gate}`}
        badgeVariant="danger"
        scopeNotice="Focused strictly on avoidable ground-vehicle engine idle duration exceeding the standard 15-minute threshold."
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            icon={<Printer size={14} />}
          >
            Export Briefing
          </Button>
        }
      />

      {/* A. Summary Banner */}
      <HotspotBanner banner={banner} />

      {/* B. Empirical Evidence Section */}
      <HotspotEvidence evidence={evidence} />

      {/* C. Pattern Visualization Section */}
      <TwoColumnGrid>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>
                <TrendingUp size={16} color="#0D9488" />
                <span>Daily Excessive Idling Trend</span>
              </CardTitle>
              <CardDescription>Frequency of 15m+ breaches and avoidable CO2 output over 7 days</CardDescription>
            </div>
          </CardHeader>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patternVisualization.dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="date" fontSize={11} tickFormatter={(d) => d.slice(5)} />
                <YAxis yAxisId="left" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" fontSize={11} unit="kg" />
                <RechartsTooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar yAxisId="left" dataKey="excessiveEvents" name="Breach Events" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="avoidableCo2Kg" name="Avoidable CO2 (kg)" fill="#E11D48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>
                <Scale size={16} color="#0284C7" />
                <span>Hotspot vs. Airport Baseline</span>
              </CardTitle>
              <CardDescription>Comparison with facility-wide operational averages</CardDescription>
            </div>
          </CardHeader>
          <BaselineComparisonChart comparison={patternVisualization.baselineComparison} />
        </Card>
      </TwoColumnGrid>

      {/* D. Transparent Explanation Panel */}
      <ExplanationCard>
        <CardHeader>
          <CardTitle>
            <FileText size={18} color="#0D9488" />
            <span>Root-Cause Explanation & Analytical Bounds</span>
          </CardTitle>
          <CardDescription>Transparent rationale behind the algorithmic classification</CardDescription>
        </CardHeader>

        <ExplanationGrid>
          <ExplanationBlock>
            <h4>What was detected?</h4>
            <p>{explanation.whatWasDetected}</p>
          </ExplanationBlock>

          <ExplanationBlock>
            <h4>Why is it considered avoidable?</h4>
            <p>{explanation.whyConsideredAvoidable}</p>
          </ExplanationBlock>

          <ExplanationBlock>
            <h4>Where did it occur?</h4>
            <p>{explanation.whereItOccurred}</p>
          </ExplanationBlock>

          <ExplanationBlock>
            <h4>How often did it breach baseline?</h4>
            <p>{explanation.howOftenItOccurred}</p>
          </ExplanationBlock>

          <ExplanationBlock>
            <h4>Operational Threshold Applied:</h4>
            <p>{explanation.thresholdApplied}</p>
          </ExplanationBlock>

          <ExplanationBlock>
            <h4>Telemetry Basis:</h4>
            <p>{explanation.dataUsed}</p>
          </ExplanationBlock>

          <ExplanationBlock style={{ gridColumn: '1 / -1' }}>
            <h4 style={{ color: '#D97706' }}>What this analysis does NOT prove:</h4>
            <p>{explanation.whatAnalysisDoesNotProve}</p>
          </ExplanationBlock>
        </ExplanationGrid>
      </ExplanationCard>

      {/* E. Operational Recommendation */}
      <RecommendationCard recommendation={recommendation} />

      {/* 10. Interactive Before-and-After Simulation */}
      <SimulationPanel
        targetIdleMinutes={targetIdleMinutes}
        onTargetChange={setTargetIdleMinutes}
        simulation={simulation}
        loading={simLoading}
        onReset={resetTarget}
      />

      {/* Assumptions & Math Model */}
      <AssumptionsPanel assumptions={assumptions} />
    </div>
  );
}

export default HotspotPage;
