import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.danger}44;
  border-radius: ${({ theme }) => theme.radius.lg};
  min-height: 240px;
`;

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 440px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export function ErrorState({ title = 'Unable to Load Data', message = 'An unexpected error occurred while communicating with the server.', onRetry }) {
  return (
    <Container>
      <IconWrapper>
        <AlertCircle size={26} />
      </IconWrapper>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry} icon={<RefreshCw size={14} />}>
          Try Again
        </Button>
      )}
    </Container>
  );
}

export default ErrorState;

