import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Leaf, Info } from 'lucide-react';
import { media } from '../../styles/breakpoints';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  margin-top: auto;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const BrandLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const NoticeLine = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 600px;
  line-height: 1.4;
`;

const LinksGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.sizes.xs};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const StatusPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.success};
  background-color: ${({ theme }) => theme.colors.successBg};
  padding: 0.2rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.success}33;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.success};
  }
`;

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <LeftBlock>
          <BrandLine>
            <Leaf size={14} color="#0D9488" />
            <span>Airport Carbon Hotspot — Operational Emissions Intelligence</span>
          </BrandLine>
          <NoticeLine>
            Synthetic Demonstration Model. Deterministic ground-vehicle telemetry analysis for hackathon evaluation only.
          </NoticeLine>
        </LeftBlock>

        <LinksGroup>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/hotspot">Hotspot Analysis</Link>
          <Link to="/operations">Telemetry Records</Link>
          <Link to="/compare">Airport Comparison</Link>
          <Link to="/methodology">Methodology & Assumptions</Link>
        </LinksGroup>

        <StatusPill>
          <span>DEMO ENVIRONMENT ACTIVE</span>
        </StatusPill>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;

