import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Flame,
  TableProperties,
  GitCompare,
  BookOpen,
  X,
  Plane
} from 'lucide-react';
import { fadeIn } from '../../styles/animations';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: 60;
  backdrop-filter: blur(2px);
  animation: ${fadeIn} 0.2s ease-out;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 70;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.base};
`;

const CloseBtn = styled.button`
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }
`;

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/hotspot', label: 'Carbon Hotspot', icon: Flame },
  { path: '/operations', label: 'Operations Explorer', icon: TableProperties },
  { path: '/compare', label: 'Airport Comparison', icon: GitCompare },
  { path: '/methodology', label: 'Methodology', icon: BookOpen }
];

export function MobileNavigation({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Drawer>
        <DrawerHeader>
          <Brand>
            <Plane size={20} color="#0D9488" />
            <span>Airport Hotspot</span>
          </Brand>
          <CloseBtn onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </CloseBtn>
        </DrawerHeader>

        <NavList>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <StyledNavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </StyledNavLink>
            );
          })}
        </NavList>
      </Drawer>
    </>
  );
}

export default MobileNavigation;

