import React from 'react';
import styled, { css } from 'styled-components';
import { rotate } from '../../styles/animations';
import { Loader2 } from 'lucide-react';

const Spinner = styled(Loader2)`
  animation: ${rotate} 1s linear infinite;
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  white-space: nowrap;
  user-select: none;

  /* Sizes */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          padding: 0.375rem 0.75rem;
          font-size: ${theme.typography.sizes.xs};
        `;
      case 'lg':
        return css`
          padding: 0.75rem 1.5rem;
          font-size: ${theme.typography.sizes.base};
        `;
      default:
        return css`
          padding: 0.5rem 1rem;
          font-size: ${theme.typography.sizes.sm};
        `;
    }
  }}

  /* Variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.surfaceMuted};
          color: ${theme.colors.textPrimary};
          border: 1px solid ${theme.colors.border};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.surfaceHover};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLight};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.textSecondary};
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.surfaceMuted};
            color: ${theme.colors.textPrimary};
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.danger};
          color: #ffffff;
          border: 1px solid ${theme.colors.danger};
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
      default: // primary
        return css`
          background-color: ${theme.colors.primary};
          color: #ffffff;
          border: 1px solid ${theme.colors.primary};
          box-shadow: 0 1px 2px rgba(13, 148, 136, 0.2);
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
    }
  }}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

export function Button({ children, variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled, icon, ...props }) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size={16} /> : icon}
      {children}
    </StyledButton>
  );
}

export default Button;

