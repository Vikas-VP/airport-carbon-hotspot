import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAirport } from '../../context/AirportContext';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from './Badge';
import {
  Plane,
  Sun,
  Moon,
  HelpCircle,
  Menu,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { media } from '../../styles/breakpoints';

const HeaderContainer = styled.header`
  height: 68px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 40;
  transition: background-color ${({ theme }) => theme.transitions.normal};

  ${media.tablet} {
    padding: 0 ${({ theme }) => theme.spacing.md};
    height: 60px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MobileMenuBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radius.md};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }

  ${media.tablet} {
    display: flex;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const LogoIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(13, 148, 136, 0.3);
`;

const BrandTextGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    display: none;
  }
`;

const BrandTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

const BrandTagline = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.02em;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const AirportSelectorWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.25rem 0.5rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LocationPin = styled(MapPin)`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.35rem;
  flex-shrink: 0;

  ${media.mobile} {
    display: none;
  }
`;

const AirportSelect = styled.select`
  appearance: none;
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  padding-right: 1.5rem;
  padding-left: 0.25rem;

  &:focus {
    outline: none;
  }

  option {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const SelectArrow = styled(ChevronDown)`
  position: absolute;
  right: 0.5rem;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const AirportInfoBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  padding: 0.35rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${media.laptop} {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const SyntheticBadge = styled(Badge)`
  ${media.mobile} {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
  }
`;

export function Header({ onToggleMobileNav }) {
  const { airports, selectedAirportId, selectedAirport, setSelectedAirportId } = useAirport();
  const { toggleTheme, isDark } = useTheme();

  return (
    <HeaderContainer>
      <LeftSection>
        <MobileMenuBtn onClick={onToggleMobileNav} aria-label="Open navigation menu">
          <Menu size={20} />
        </MobileMenuBtn>

        <Brand to="/dashboard">
          <LogoIconWrapper>
            <Plane size={20} />
          </LogoIconWrapper>
          <BrandTextGroup>
            <BrandTitle>Airport Carbon Hotspot</BrandTitle>
            <BrandTagline>Avoidable Operational Emissions Intelligence</BrandTagline>
          </BrandTextGroup>
        </Brand>
      </LeftSection>

      <CenterSection>
        <AirportSelectorWrapper>
          <LocationPin size={16} />
          <AirportSelect
            value={selectedAirportId}
            onChange={(e) => setSelectedAirportId(e.target.value)}
            aria-label="Select airport for analysis"
          >
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.code} - {airport.name} ({airport.location})
              </option>
            ))}
          </AirportSelect>
          <SelectArrow size={14} />
        </AirportSelectorWrapper>

        {selectedAirport && (
          <AirportInfoBadge>
            <span>{selectedAirport.location}</span>
          </AirportInfoBadge>
        )}
      </CenterSection>

      <RightSection>
        <SyntheticBadge $variant="synthetic">SYNTHETIC DATA</SyntheticBadge>

        <IconButton
          as={Link}
          to="/methodology"
          aria-label="Methodology & Calculation Assumptions"
          title="Methodology & Assumptions"
        >
          <HelpCircle size={18} />
        </IconButton>

        <IconButton
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>
      </RightSection>
    </HeaderContainer>
  );
}

export default Header;

