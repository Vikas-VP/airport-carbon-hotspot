import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from './Card';
import { Tooltip } from './Tooltip';
import { HelpCircle } from 'lucide-react';
import { fadeIn } from '../../styles/animations';

const StyledMetricCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 140px;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  ${({ $accent, theme }) =>
    $accent &&
    css`
      border-top: 3px solid ${$accent};
    `}
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const LabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const MetricLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ $bg, theme }) => $bg || theme.colors.primaryLight};
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Value = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.1;
  font-feature-settings: 'tnum';
`;

const Unit = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
  margin-top: auto;
`;

export function MetricCard({
  label,
  value,
  unit,
  description,
  tooltip,
  icon,
  accentColor,
  iconBg,
  iconColor
}) {
  return (
    <StyledMetricCard $accent={accentColor}>
      <div>
        <MetricHeader>
          <LabelGroup>
            <MetricLabel>{label}</MetricLabel>
            {tooltip && (
              <Tooltip text={tooltip}>
                <HelpCircle size={14} color="#94A3B8" />
              </Tooltip>
            )}
          </LabelGroup>
          {icon && (
            <IconWrapper $bg={iconBg} $color={iconColor}>
              {icon}
            </IconWrapper>
          )}
        </MetricHeader>

        <ValueRow>
          <Value>{value}</Value>
          {unit && <Unit>{unit}</Unit>}
        </ValueRow>
      </div>

      {description && <Description>{description}</Description>}
    </StyledMetricCard>
  );
}

export default MetricCard;

