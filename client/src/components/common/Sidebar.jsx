import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Flame,
  TableProperties,
  GitCompare,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { media } from '../../styles/breakpoints';

const SidebarContainer = styled.aside`
  width: ${({ $collapsed }) => ($collapsed ? '72px' : '250px')};
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: width ${({ theme }) => theme.transitions.normal};
  height: calc(100vh - 68px);
  position: sticky;
  top: 68px;
  z-index: 30;

  ${media.tablet} {
    display: none;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  gap: 0.35rem;
  flex: 1;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 15%;
      bottom: 15%;
      width: 4px;
      border-radius: 0 4px 4px 0;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      justify-content: center;
      padding: 0.75rem 0;
    `}
`;

const NavLabel = styled.span`
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  visibility: ${({ $collapsed }) => ($collapsed ? 'hidden' : 'visible')};
  width: ${({ $collapsed }) => ($collapsed ? '0' : 'auto')};
  transition: opacity 0.2s ease;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SidebarFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  width: 100%;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const OperationalNote = styled.div`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/hotspot', label: 'Carbon Hotspot', icon: Flame },
  { path: '/operations', label: 'Operations Explorer', icon: TableProperties },
  { path: '/compare', label: 'Airport Comparison', icon: GitCompare },
  { path: '/methodology', label: 'Methodology', icon: BookOpen }
];

export function Sidebar({ collapsed, onToggleCollapse }) {
  return (
    <SidebarContainer $collapsed={collapsed} aria-label="Main Navigation">
      <NavList>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <StyledNavLink
              key={item.path}
              to={item.path}
              $collapsed={collapsed}
              title={collapsed ? item.label : undefined}
            >
              <IconWrapper>
                <Icon size={19} />
              </IconWrapper>
              <NavLabel $collapsed={collapsed}>{item.label}</NavLabel>
            </StyledNavLink>
          );
        })}
      </NavList>

      <SidebarFooter>
        <OperationalNote $collapsed={collapsed}>
          <ShieldCheck size={14} color="#0D9488" />
          <span>Non-intrusive operations analysis</span>
        </OperationalNote>

        <CollapseButton
          onClick={onToggleCollapse}
          $collapsed={collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {!collapsed && <span>Collapse Sidebar</span>}
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </CollapseButton>
      </SidebarFooter>
    </SidebarContainer>
  );
}

export default Sidebar;

