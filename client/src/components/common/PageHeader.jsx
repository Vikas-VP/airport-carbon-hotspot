import React from 'react';
import styled from 'styled-components';
import { Badge } from './Badge';
import { media } from '../../styles/breakpoints';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 720px;
  line-height: 1.45;
`;

const ActionsArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const ScopeBanner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export function PageHeader({ title, subtitle, badgeText, badgeVariant = 'primary', actions, scopeNotice }) {
  return (
    <HeaderContainer>
      <TopRow>
        <TitleArea>
          <TitleRow>
            <Title>{title}</Title>
            {badgeText && <Badge $variant={badgeVariant}>{badgeText}</Badge>}
          </TitleRow>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleArea>
        {actions && <ActionsArea>{actions}</ActionsArea>}
      </TopRow>
      {scopeNotice && <ScopeBanner>{scopeNotice}</ScopeBanner>}
    </HeaderContainer>
  );
}

export default PageHeader;

