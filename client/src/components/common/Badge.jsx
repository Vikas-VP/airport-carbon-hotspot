import styled, { css } from 'styled-components';

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0.25rem 0.625rem;
  font-size: ${({ theme, $size }) => ($size === 'sm' ? theme.typography.sizes.xs : theme.typography.sizes.sm)};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border-radius: ${({ theme }) => theme.radius.full};
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return css`
          background-color: ${theme.colors.successBg};
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success}33;
        `;
      case 'warning':
        return css`
          background-color: ${theme.colors.warningBg};
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning}33;
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.dangerBg};
          color: ${theme.colors.danger};
          border: 1px solid ${theme.colors.danger}44;
        `;
      case 'info':
        return css`
          background-color: ${theme.colors.infoBg};
          color: ${theme.colors.info};
          border: 1px solid ${theme.colors.info}33;
        `;
      case 'synthetic':
        return css`
          background-color: ${theme.colors.surfaceMuted};
          color: ${theme.colors.secondary};
          border: 1px dashed ${theme.colors.secondary};
          font-family: ${theme.typography.monoFontFamily};
          font-weight: ${theme.typography.weights.semibold};
        `;
      case 'primary':
        return css`
          background-color: ${theme.colors.primaryLight};
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary}33;
        `;
      default:
        return css`
          background-color: ${theme.colors.surfaceMuted};
          color: ${theme.colors.textSecondary};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}
`;

export default Badge;

