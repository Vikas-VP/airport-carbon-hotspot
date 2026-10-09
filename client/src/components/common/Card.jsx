import styled, { css } from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme, $variant }) =>
    $variant === 'elevated' ? theme.colors.surfaceElevated : theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme, $padding }) => $padding || theme.spacing.lg};
  box-shadow: ${({ theme, $elevated }) => ($elevated ? theme.shadows.md : theme.shadows.sm)};
  transition: transform ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast}, border-color ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  ${({ $interactive, theme }) =>
    $interactive &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.lg};
        border-color: ${theme.colors.primary};
      }
    `}

  ${({ $highlight, theme }) =>
    $highlight &&
    css`
      border-left: 4px solid ${theme.colors.danger};
    `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
`;

export default Card;

