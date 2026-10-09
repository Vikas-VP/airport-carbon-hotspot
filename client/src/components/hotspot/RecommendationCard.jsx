import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { Badge } from '../common/Badge';
import { CheckCircle2, ShieldAlert, Target, Zap, Info, ShieldCheck } from 'lucide-react';

const RecommendationContainer = styled(Card)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const RecommendationStatement = styled.blockquote`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.6;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
  border: 1px solid ${({ theme }) => theme.colors.primary}22;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const BlockBody = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const SafetyBoundaryBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => (theme.name === 'dark' ? 'rgba(245, 158, 11, 0.12)' : '#FFFBEB')};
  border: 1px solid ${({ theme }) => theme.colors.warning}44;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

const DisclaimerNote = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
  line-height: 1.4;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

export function RecommendationCard({ recommendation }) {
  if (!recommendation) return null;

  return (
    <RecommendationContainer $elevated>
      <CardHeader>
        <CardTitle>
          <CheckCircle2 size={20} color="#0D9488" />
          <span>Recommended Safe Operational Intervention</span>
        </CardTitle>
        <Badge $variant="success">One Primary Recommendation</Badge>
      </CardHeader>

      <RecommendationStatement>
        "{recommendation.statement}"
      </RecommendationStatement>

      <SectionGrid>
        <SectionBlock>
          <BlockHeader>
            <Zap size={16} color="#0D9488" />
            <span>Expected Operational Effect</span>
          </BlockHeader>
          <BlockBody>{recommendation.operationalEffect}</BlockBody>
        </SectionBlock>

        <SectionBlock>
          <BlockHeader>
            <Target size={16} color="#0284C7" />
            <span>Target Scope</span>
          </BlockHeader>
          <BlockBody>
            <strong>{recommendation.targetVehicleType}</strong> assigned to{' '}
            <strong>{recommendation.targetLocation}</strong>. {recommendation.scope}
          </BlockBody>
        </SectionBlock>

        <SectionBlock>
          <BlockHeader>
            <ShieldCheck size={16} color="#10B981" />
            <span>Supporting Empirical Evidence</span>
          </BlockHeader>
          <BlockBody>{recommendation.evidenceSummary}</BlockBody>
        </SectionBlock>
      </SectionGrid>

      <SafetyBoundaryBox>
        <ShieldAlert size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ fontSize: '0.875rem', color: '#D97706', display: 'block', marginBottom: '2px' }}>
            Non-Negotiable Safety Boundary
          </strong>
          <span style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
            {recommendation.safetyBoundary}
          </span>
        </div>
      </SafetyBoundaryBox>

      <DisclaimerNote>
        <strong>Operational Disclaimer:</strong> {recommendation.disclaimer}
      </DisclaimerNote>
    </RecommendationContainer>
  );
}

export default RecommendationCard;

