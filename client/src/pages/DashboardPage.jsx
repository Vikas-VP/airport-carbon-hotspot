import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAirport } from '../context/AirportContext';
import { useDashboard } from '../hooks/useDashboard';
import { PageHeader } from '../components/common/PageHeader';
import { MetricCard } from '../components/common/MetricCard';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { LoadingSkeleton, Skeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import { DailyEmissionsChart } from '../components/charts/DailyEmissionsChart';
import { TerminalEmissionsChart } from '../components/charts/TerminalEmissionsChart';
import { VehicleTypeChart } from '../components/charts/VehicleTypeChart';
import { IdleClassificationChart } from '../components/charts/IdleClassificationChart';
import { Modal } from '../components/common/Modal';
import {
  formatNumber,
  formatMinutes,
  formatCo2,
  formatDateTime
} from '../utils/formatters';
import {
  Truck,
  Clock,
  CloudRain,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingDown,
  Info,
  Calendar,
  Layers,
  Sparkles,
  Printer
} from 'lucide-react';
import { media } from '../styles/breakpoints';

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const HotspotSummaryCard = styled(Card)`
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.1) 0%, rgba(21, 34, 56, 1) 100%)'
      : 'linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 100%)'};
  border: 1px solid ${({ theme }) => theme.colors.danger}55;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HotspotCardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const HotspotInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-width: 800px;
`;

const HotspotLocation = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const HotspotStatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;

  span.label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 0.04em;
  }
  span.val {
    font-size: ${({ theme }) => theme.typography.sizes.base};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.monoFontFamily};
  }
`;

export function DashboardPage() {
  const navigate = useNavigate();
  const { selectedAirportId } = useAirport();
  const { data, loading, error, refetch } = useDashboard(selectedAirportId);
  const [showKpiModal, setShowKpiModal] = useState(false);

  if (loading) {
    return (
      <div>
        <Skeleton $height="3rem" $width="40%" $margin="0 0 1.5rem 0" />
        <KpiGrid>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} $height="140px" $radius="16px" />
          ))}
        </KpiGrid>
        <Skeleton $height="180px" $radius="16px" $margin="0 0 1.5rem 0" />
        <ChartsGrid>
          <Skeleton $height="340px" $radius="16px" />
          <Skeleton $height="340px" $radius="16px" />
        </ChartsGrid>
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Dashboard Telemetry Unavailable"
        message={error || 'Failed to retrieve operational metrics for this facility.'}
        onRetry={refetch}
      />
    );
  }

  const { airport, kpis, charts, hotspotSummary } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <PageHeader
        title={`${airport.name} (${airport.code})`}
        subtitle={`${airport.location} • Monitored Observation Scope: ${airport.scope}`}
        badgeText="Synthetic Telemetry"
        badgeVariant="synthetic"
        scopeNotice={`Last telemetry synthesis: ${formatDateTime(airport.lastAnalyzed)} • Observation Window: 7 Days`}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowKpiModal(true)}
              icon={<Info size={14} />}
            >
              Metric Glossary
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer size={14} />}
            >
              Print Report
            </Button>
          </div>
        }
      />

      {/* Primary Hotspot Summary Card */}
      {hotspotSummary && (
        <HotspotSummaryCard $elevated>
          <HotspotCardContent>
            <HotspotInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <Flame size={18} color="#E11D48" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E11D48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Rank 1 Carbon Hotspot Detected
                </span>
                <Badge $variant={hotspotSummary.severity === 'High' ? 'danger' : 'warning'} $size="sm">
                  Severity: {hotspotSummary.severity}
                </Badge>
              </div>

              <HotspotLocation>
                <span>{hotspotSummary.vehicleType}</span>
                <span style={{ color: '#64748B', fontWeight: 400 }}>at</span>
                <span>{hotspotSummary.location}</span>
              </HotspotLocation>

              <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: '4px', lineHeight: '1.45' }}>
                {hotspotSummary.whySelected}
              </p>

              <HotspotStatsRow>
                <StatItem>
                  <span className="label">Breach Frequency</span>
                  <span className="val">{hotspotSummary.breachFrequency}</span>
                </StatItem>
                <StatItem>
                  <span className="label">Observed Emissions</span>
                  <span className="val">{formatCo2(hotspotSummary.currentCo2Kg)}</span>
                </StatItem>
                <StatItem>
                  <span className="label">Potentially Avoidable</span>
                  <span className="val" style={{ color: '#E11D48' }}>{formatCo2(hotspotSummary.avoidableCo2Kg)}</span>
                </StatItem>
              </HotspotStatsRow>
            </HotspotInfo>

            <Button
              variant="danger"
              size="md"
              onClick={() => navigate('/hotspot')}
              icon={<ArrowRight size={16} />}
            >
              Analyze Hotspot & Simulate
            </Button>
          </HotspotCardContent>
        </HotspotSummaryCard>
      )}

      {/* KPI Cards Grid */}
      <KpiGrid>
        <MetricCard
          label={kpis.totalVehicles.label}
          value={kpis.totalVehicles.value}
          unit={kpis.totalVehicles.unit}
          description={kpis.totalVehicles.description}
          tooltip={kpis.totalVehicles.tooltip}
          icon={<Truck size={18} />}
          accentColor="#0D9488"
        />

        <MetricCard
          label={kpis.totalIdleMinutes.label}
          value={formatMinutes(kpis.totalIdleMinutes.value)}
          unit=""
          description={kpis.totalIdleMinutes.description}
          tooltip={kpis.totalIdleMinutes.tooltip}
          icon={<Clock size={18} />}
          iconColor="#0284C7"
          iconBg="rgba(2, 132, 199, 0.15)"
          accentColor="#0284C7"
        />

        <MetricCard
          label={kpis.totalCo2Kg.label}
          value={formatNumber(kpis.totalCo2Kg.value)}
          unit={kpis.totalCo2Kg.unit}
          description={kpis.totalCo2Kg.description}
          tooltip={kpis.totalCo2Kg.tooltip}
          icon={<CloudRain size={18} />}
          iconColor="#6366F1"
          iconBg="rgba(99, 102, 241, 0.15)"
          accentColor="#6366F1"
        />

        <MetricCard
          label={kpis.avoidableIdleMinutes.label}
          value={formatMinutes(kpis.avoidableIdleMinutes.value)}
          unit=""
          description={kpis.avoidableIdleMinutes.description}
          tooltip={kpis.avoidableIdleMinutes.tooltip}
          icon={<TrendingDown size={18} />}
          iconColor="#E11D48"
          iconBg="rgba(225, 29, 72, 0.15)"
          accentColor="#E11D48"
        />

        <MetricCard
          label={kpis.avoidableCo2Kg.label}
          value={formatNumber(kpis.avoidableCo2Kg.value)}
          unit={kpis.avoidableCo2Kg.unit}
          description={kpis.avoidableCo2Kg.description}
          tooltip={kpis.avoidableCo2Kg.tooltip}
          icon={<Flame size={18} />}
          iconColor="#E11D48"
          iconBg="rgba(225, 29, 72, 0.15)"
          accentColor="#E11D48"
        />

        <MetricCard
          label={kpis.thresholdBreaches.label}
          value={kpis.thresholdBreaches.value}
          unit={kpis.thresholdBreaches.unit}
          description={kpis.thresholdBreaches.description}
          tooltip={kpis.thresholdBreaches.tooltip}
          icon={<AlertTriangle size={18} />}
          iconColor="#F59E0B"
          iconBg="rgba(245, 158, 11, 0.15)"
          accentColor="#F59E0B"
        />
      </KpiGrid>

      {/* Dashboard Charts */}
      <ChartsGrid>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Daily Idling Emissions Profile</CardTitle>
              <CardDescription>7-day trend of total vs avoidable stationary combustion</CardDescription>
            </div>
          </CardHeader>
          <DailyEmissionsChart data={charts.dailyEmissions} />
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Emissions by Terminal Zone</CardTitle>
              <CardDescription>Distribution of stationary idling CO2 across terminals</CardDescription>
            </div>
          </CardHeader>
          <TerminalEmissionsChart data={charts.terminalEmissions} />
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Idle Duration by Ground Vehicle Type</CardTitle>
              <CardDescription>Total stationary engine time vs avoidable time above baseline</CardDescription>
            </div>
          </CardHeader>
          <VehicleTypeChart data={charts.vehicleTypeIdle} />
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Turnaround Idling Classification</CardTitle>
              <CardDescription>Event distribution: Normal (&le;15m), Review, Excessive, Exceptions</CardDescription>
            </div>
          </CardHeader>
          <IdleClassificationChart data={charts.idlingClassification} />
        </Card>
      </ChartsGrid>

      {/* KPI Glossary Modal */}
      <Modal
        isOpen={showKpiModal}
        onClose={() => setShowKpiModal(false)}
        title="Airport Operational KPI Glossary"
        maxWidth="620px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
          <div>
            <strong>Active Ground Fleet:</strong> The total number of synthetic ground support vehicles (GSE) active during the 7-day observation.
          </div>
          <div>
            <strong>Total Idling Time:</strong> Cumulative stationary engine-on time recorded for all vehicles across turnaround and staging events.
          </div>
          <div>
            <strong>Estimated Idling CO2:</strong> Modeled diesel combustion emissions calculated using equipment-specific fuel rates and 2.68 kg CO2/L.
          </div>
          <div>
            <strong>Avoidable Idle Time:</strong> Stationary minutes exceeding the 15-minute operational limit. Operational exceptions are strictly excluded.
          </div>
          <div>
            <strong>Potentially Avoidable CO2:</strong> The volume of carbon emissions attributable strictly to excess idle minutes beyond the baseline.
          </div>
          <div>
            <strong>Threshold Breaches:</strong> Monitored events where stationary time exceeded the 15-minute standard without documented exception.
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DashboardPage;
