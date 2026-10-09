import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAirport } from '../context/AirportContext';
import { getAirportComparison } from '../api/comparisonApi';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { Skeleton } from '../components/common/LoadingSkeleton';
import { formatNumber, formatMinutes, formatCo2, formatPercent } from '../utils/formatters';
import {
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
  GitCompare,
  ArrowRight,
  Truck,
  Clock,
  CloudRain,
  Flame,
  AlertTriangle,
  Building2,
  MapPin
} from 'lucide-react';
import { media } from '../styles/breakpoints';

const AirportCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.laptop} {
    grid-template-columns: 1fr;
  }
`;

const AirportSummaryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 4px solid ${({ theme, $highlight }) => ($highlight ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $highlight }) => ($highlight ? theme.colors.surfaceElevated : theme.colors.surface)};
`;

const AirportCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AirportTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const AirportName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const LocationText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};

  span.val {
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-family: ${({ theme }) => theme.typography.monoFontFamily};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const HotspotPill = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.65rem;
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

const ProfileBadge = styled.div`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.laptop} {
    grid-template-columns: 1fr;
  }
`;

export function ComparisonPage() {
  const navigate = useNavigate();
  const { selectedAirportId, setSelectedAirportId } = useAirport();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadComparison() {
      setLoading(true);
      setError(null);
      try {
        const response = await getAirportComparison();
        setData(response.data);
      } catch (err) {
        console.error('Failed to load airport comparison:', err);
        setError(err.message || 'Unable to retrieve comparison data');
      } finally {
        setLoading(false);
      }
    }
    loadComparison();
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton $height="3rem" $width="40%" $margin="0 0 1.5rem 0" />
        <AirportCardsGrid>
          <Skeleton $height="360px" $radius="16px" />
          <Skeleton $height="360px" $radius="16px" />
          <Skeleton $height="360px" $radius="16px" />
        </AirportCardsGrid>
        <ChartsGrid>
          <Skeleton $height="300px" $radius="16px" />
          <Skeleton $height="300px" $radius="16px" />
          <Skeleton $height="300px" $radius="16px" />
        </ChartsGrid>
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Comparison Overview Unavailable"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const { airports, charts } = data;

  const handleSelectAndAnalyze = (airportId) => {
    setSelectedAirportId(airportId);
    navigate('/hotspot');
  };

  return (
    <div>
      <PageHeader
        title="Multi-Airport Operational Overview"
        subtitle="Cross-facility synthetic demonstration comparison. Ground-vehicle idling profiles and primary identified hotspots."
        badgeText="Multi-Facility Model"
        badgeVariant="primary"
        scopeNotice="Informational comparative perspective only. Hotspot recommendations remain strictly scoped to individual facility contexts."
      />

      {/* Summary Cards per Airport */}
      <AirportCardsGrid>
        {airports.map((airport) => {
          const isCurrent = airport.id.toLowerCase() === selectedAirportId.toLowerCase();

          return (
            <AirportSummaryCard key={airport.id} $highlight={isCurrent}>
              <div>
                <AirportCardHeader>
                  <AirportTitleGroup>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AirportName>{airport.name}</AirportName>
                      <Badge $variant="secondary" $size="sm">
                        {airport.code}
                      </Badge>
                    </div>
                    <LocationText>
                      <MapPin size={12} />
                      <span>{airport.location}</span>
                    </LocationText>
                  </AirportTitleGroup>
                  {isCurrent && <Badge $variant="primary" $size="sm">Current Scope</Badge>}
                </AirportCardHeader>

                <ProfileBadge>{airport.modeledProfile}</ProfileBadge>

                <StatsList>
                  <StatRow>
                    <span>Monitored Ground Fleet:</span>
                    <span className="val">{airport.totalVehicles} Vehicles</span>
                  </StatRow>
                  <StatRow>
                    <span>Total Stationary Idling:</span>
                    <span className="val">{formatMinutes(airport.totalIdleMinutes)}</span>
                  </StatRow>
                  <StatRow>
                    <span>Average Idle Duration:</span>
                    <span className="val">{airport.averageIdleDurationMinutes} mins</span>
                  </StatRow>
                  <StatRow>
                    <span>Total Estimated CO2:</span>
                    <span className="val">{formatCo2(airport.totalCo2Kg)}</span>
                  </StatRow>
                  <StatRow>
                    <span>Avoidable Idling CO2:</span>
                    <span className="val" style={{ color: '#E11D48' }}>{formatCo2(airport.avoidableCo2Kg)}</span>
                  </StatRow>
                  <StatRow>
                    <span>Excessive-Idling Events:</span>
                    <span className="val">{airport.excessiveEventsCount} events</span>
                  </StatRow>
                </StatsList>

                {airport.primaryHotspot && (
                  <HotspotPill>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#E11D48', marginBottom: '2px' }}>
                      <Flame size={14} />
                      <span>Primary Hotspot:</span>
                    </div>
                    <div>
                      {airport.primaryHotspot.vehicleType} at {airport.primaryHotspot.location} ({formatCo2(airport.primaryHotspot.avoidableCo2Kg)} avoidable)
                    </div>
                  </HotspotPill>
                )}
              </div>

              <Button
                variant={isCurrent ? 'primary' : 'outline'}
                size="sm"
                fullWidth
                onClick={() => handleSelectAndAnalyze(airport.id)}
                icon={<ArrowRight size={14} />}
              >
                Analyze this airport
              </Button>
            </AirportSummaryCard>
          );
        })}
      </AirportCardsGrid>

      {/* Comparison Charts */}
      <ChartsGrid>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Total vs. Avoidable CO2</CardTitle>
              <CardDescription>Modeled 7-day carbon emissions (kg CO2)</CardDescription>
            </div>
          </CardHeader>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.emissionsComparison}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} unit=" kg" />
                <RechartsTooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="totalCo2Kg" name="Total CO2" fill="#0284C7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avoidableCo2Kg" name="Avoidable CO2" fill="#E11D48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Modeled Avoidable CO2 Volume</CardTitle>
              <CardDescription>Estimated potential carbon savings</CardDescription>
            </div>
          </CardHeader>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.avoidableCo2Comparison}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} unit=" kg" />
                <RechartsTooltip />
                <Bar dataKey="avoidableCo2Kg" name="Avoidable CO2" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Average Idle Duration</CardTitle>
              <CardDescription>Mean stationary idle time per event (mins)</CardDescription>
            </div>
          </CardHeader>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.averageIdleComparison}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} unit=" m" />
                <RechartsTooltip />
                <Bar dataKey="averageIdleDuration" name="Avg Idle Minutes" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </ChartsGrid>
    </div>
  );
}

export default ComparisonPage;
