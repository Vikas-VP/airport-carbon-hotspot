import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Plane, Home } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ErrorCode = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 480px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.5;
`;

export function NotFoundPage() {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Off-Radar Waypoint</Title>
      <Description>
        The requested operational dashboard view or report was not found on this airfield.
      </Description>
      <Button as={Link} to="/dashboard" variant="primary" size="md" icon={<Home size={16} />}>
        Return to Dashboard
      </Button>
    </Container>
  );
}

export default NotFoundPage;

