import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { Inbox } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  min-height: 240px;
`;

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
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
  max-width: 400px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export function EmptyState({ icon, title = 'No records found', message = 'No data matches your criteria.', actionText, onAction }) {
  return (
    <Container>
      <IconWrapper>{icon || <Inbox size={26} />}</IconWrapper>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Container>
  );
}

export default EmptyState;

