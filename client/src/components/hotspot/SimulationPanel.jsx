import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { BeforeAfterChart } from '../charts/BeforeAfterChart';
import { formatNumber, formatMinutes, formatCo2, formatFuel, formatPercent } from '../../utils/formatters';
import { SIMULATION_PRESETS } from '../../utils/constants';
import { Sliders, RotateCcw, TrendingDown, ArrowRight, Loader2, Sparkles, Check } from 'lucide-react';
import { rotate } from '../../styles/animations';
import { media } from '../../styles/breakpoints';

const SimulationContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ControlsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SliderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SliderLabelGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SliderTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const TargetValueDisplay = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
`;

const SliderInput = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => (theme.name === 'dark' ? '#334155' : '#CBD5E1')};
  outline: none;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const SliderTicks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
`;

const PresetsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const PresetButton = styled.button`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primaryLight : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const CalculatingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.primary};
`;

const SpinIcon = styled(Loader2)`
  animation: ${rotate} 1s linear infinite;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const BeforeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.danger}44;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const AfterCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.primary}55;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};

  ${media.tablet} {
    transform: rotate(90deg);
  }
`;

const PhaseTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  span.val {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-family: ${({ theme }) => theme.typography.monoFontFamily};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const SavingsBanner = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryLight} 0%, ${({ theme }) => theme.colors.surface} 100%);
  border: 1px solid ${({ theme }) => theme.colors.primary}44;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SavingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SavingsTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SavingsStatsGrid = styled.div`
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

const SavingStatBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const SavingLabel = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textMuted};
  display: block;
`;

const SavingValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  margin-top: 0.25rem;
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
`;

const ProgressBarWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => (theme.name === 'dark' ? '#1E293B' : '#E2E8F0')};
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ $pct }) => `${Math.min(100, Math.max(0, $pct))}%`};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 5px;
  transition: width 0.4s ease;
`;

const ExplanationText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  line-height: 1.45;
`;

export function SimulationPanel({
  targetIdleMinutes,
  onTargetChange,
  simulation,
  loading,
  onReset
}) {
  if (!simulation) return null;

  const { before, after, savings, explanationNote } = simulation;

  return (
    <SimulationContainer $elevated>
      <CardHeader>
        <CardTitle>
          <Sliders size={20} color="#0D9488" />
          <span>Interactive Before & After Operational Simulation</span>
        </CardTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {loading && (
            <CalculatingIndicator>
              <SpinIcon size={14} />
              <span>Recalculating...</span>
            </CalculatingIndicator>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            icon={<RotateCcw size={14} />}
          >
            Reset to 15m Baseline
          </Button>
        </div>
      </CardHeader>

      <ControlsSection>
        <SliderHeader>
          <SliderLabelGroup>
            <SliderTitle>Target Stationary Idle Threshold:</SliderTitle>
            <TargetValueDisplay>{targetIdleMinutes} minutes</TargetValueDisplay>
          </SliderLabelGroup>
          <Badge $variant="primary" $size="sm">
            Range: 5m to 30m
          </Badge>
        </SliderHeader>

        <SliderInput
          type="range"
          min="5"
          max="30"
          step="1"
          value={targetIdleMinutes}
          onChange={(e) => onTargetChange(Number(e.target.value))}
          aria-label="Target Permitted Idle Duration Slider"
        />

        <SliderTicks>
          <span>5m (Ambitious)</span>
          <span>15m (Airport Baseline)</span>
          <span>30m (Permissive)</span>
        </SliderTicks>

        <PresetsRow>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
            Policy Scenarios:
          </span>
          {SIMULATION_PRESETS.map((p) => (
            <PresetButton
              key={p.value}
              $active={targetIdleMinutes === p.value}
              onClick={() => onTargetChange(p.value)}
              title={p.desc}
            >
              {p.label}
            </PresetButton>
          ))}
        </PresetsRow>
      </ControlsSection>

      <SavingsBanner>
        <SavingsHeader>
          <SavingsTitle>
            <Sparkles size={18} color="#0D9488" />
            <span>Projected Environmental & Operational Impact</span>
          </SavingsTitle>
          <Badge $variant={savings.co2Kg > 0 ? 'success' : 'neutral'}>
            {savings.percentage}% Carbon Curtailment
          </Badge>
        </SavingsHeader>

        <SavingsStatsGrid>
          <SavingStatBox>
            <SavingLabel>Avoided Idling Time</SavingLabel>
            <SavingValue>{formatMinutes(savings.idleMinutes)}</SavingValue>
          </SavingStatBox>

          <SavingStatBox>
            <SavingLabel>Estimated Fuel Saved</SavingLabel>
            <SavingValue>{formatFuel(savings.fuelLiters)}</SavingValue>
          </SavingStatBox>

          <SavingStatBox>
            <SavingLabel>Estimated CO2 Avoided</SavingLabel>
            <SavingValue>{formatCo2(savings.co2Kg)}</SavingValue>
          </SavingStatBox>

          <SavingStatBox>
            <SavingLabel>Relative Emissions Reduction</SavingLabel>
            <SavingValue>{formatPercent(savings.percentage)}</SavingValue>
          </SavingStatBox>
        </SavingsStatsGrid>

        <ProgressBarWrapper>
          <ProgressBarFill $pct={savings.percentage} />
        </ProgressBarWrapper>

        <ExplanationText>{explanationNote}</ExplanationText>
      </SavingsBanner>

      <ComparisonGrid>
        <BeforeCard>
          <PhaseTitle>
            <span>Before Intervention (Observed Baseline)</span>
            <Badge $variant="danger" $size="sm">Current</Badge>
          </PhaseTitle>
          <StatRow>
            <span>Total Stationary Idling:</span>
            <span className="val">{formatMinutes(before.idleMinutes)}</span>
          </StatRow>
          <StatRow>
            <span>Modeled Fuel Burned:</span>
            <span className="val">{formatFuel(before.fuelLiters)}</span>
          </StatRow>
          <StatRow>
            <span>Modeled Carbon Output:</span>
            <span className="val" style={{ color: '#E11D48' }}>{formatCo2(before.co2Kg)}</span>
          </StatRow>
        </BeforeCard>

        <ArrowWrapper>
          <ArrowRight size={28} />
        </ArrowWrapper>

        <AfterCard>
          <PhaseTitle>
            <span>After Intervention (Target Cap Applied)</span>
            <Badge $variant="success" $size="sm">Simulated</Badge>
          </PhaseTitle>
          <StatRow>
            <span>Simulated Stationary Idling:</span>
            <span className="val">{formatMinutes(after.idleMinutes)}</span>
          </StatRow>
          <StatRow>
            <span>Simulated Fuel Burned:</span>
            <span className="val">{formatFuel(after.fuelLiters)}</span>
          </StatRow>
          <StatRow>
            <span>Simulated Carbon Output:</span>
            <span className="val" style={{ color: '#0D9488' }}>{formatCo2(after.co2Kg)}</span>
          </StatRow>
        </AfterCard>
      </ComparisonGrid>

      <div style={{ marginTop: '1rem' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: '#64748B' }}>
          Side-by-Side Simulation Metrics
        </h4>
        <BeforeAfterChart before={before} after={after} />
      </div>
    </SimulationContainer>
  );
}

export default SimulationPanel;

