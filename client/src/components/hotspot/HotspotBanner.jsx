import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Flame, AlertTriangle, MapPin, Calendar, Truck } from 'lucide-react';
import { pulseGlow } from '../../styles/animations';
import { media } from '../../styles/breakpoints';

const BannerCard = styled(Card)`
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.12) 0%, rgba(21, 34, 56, 1) 100%)'
      : 'linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 100%)'};
  border: 1px solid ${({ theme }) => theme.colors.danger}44;
  position: relative;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const HotspotTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.danger};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PulseDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.danger};
  animation: ${pulseGlow} 2s infinite;
`;

const MainHeading = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`;

const ExplanationText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 900px;
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const MetaIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 2px;
`;

const MetaContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetaLabel = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MetaValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export function HotspotBanner({ banner }) {
  if (!banner) return null;

  const severityVariant = banner.severity === 'High' ? 'danger' : banner.severity === 'Moderate' ? 'warning' : 'info';

  return (
    <BannerCard $elevated>
      <TopLine>
        <HotspotTag>
          <PulseDot />
          <Flame size={18} />
          <span>Primary Carbon Hotspot Detected</span>
        </HotspotTag>
        <Badge $variant={severityVariant} $size="sm">
          Severity: {banner.severity}
        </Badge>
      </TopLine>

      <MainHeading>
        <span>{banner.vehicleType}</span>
        <span style={{ color: '#64748B' }}>at</span>
        <span>Terminal {banner.terminal}, Gate {banner.gate}</span>
      </MainHeading>

      <ExplanationText>{banner.oneSentenceExplanation}</ExplanationText>

      <MetadataGrid>
        <MetaItem>
          <MetaIcon>
            <MapPin size={16} />
          </MetaIcon>
          <MetaContent>
            <MetaLabel>Airport Facility</MetaLabel>
            <MetaValue>{banner.airport} ({banner.airportCode})</MetaValue>
          </MetaContent>
        </MetaItem>

        <MetaItem>
          <MetaIcon>
            <Truck size={16} />
          </MetaIcon>
          <MetaContent>
            <MetaLabel>Target Fleet Type</MetaLabel>
            <MetaValue>{banner.vehicleType}</MetaValue>
          </MetaContent>
        </MetaItem>

        <MetaItem>
          <MetaIcon>
            <Calendar size={16} />
          </MetaIcon>
          <MetaContent>
            <MetaLabel>Observation Period</MetaLabel>
            <MetaValue>{banner.analysisPeriod}</MetaValue>
          </MetaContent>
        </MetaItem>
      </MetadataGrid>
    </BannerCard>
  );
}

export default HotspotBanner;

