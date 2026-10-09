import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import Footer from './Footer';
import ToastContainer from './ToastContainer';
import { media } from '../../styles/breakpoints';

const ShellLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <ShellLayout>
      <Header onToggleMobileNav={() => setMobileNavOpen(true)} />
      <MainContainer>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContainer>
      <Footer />
      <MobileNavigation
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <ToastContainer />
    </ShellLayout>
  );
}

export default AppShell;

