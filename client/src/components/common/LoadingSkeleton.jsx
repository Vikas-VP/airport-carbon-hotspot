import styled, { css } from 'styled-components';
import { shimmer } from '../../styles/animations';

export const Skeleton = styled.div`
  background: ${({ theme }) =>
    theme.name === 'dark'
      ? 'linear-gradient(90deg, #1E293B 25%, #334155 37%, #1E293B 63%)'
      : 'linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 37%, #F1F5F9 63%)'};
  background-size: 400% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
  border-radius: ${({ theme, $radius }) => $radius || theme.radius.sm};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '1rem'};
  margin: ${({ $margin }) => $margin || '0'};

  ${({ $circle }) =>
    $circle &&
    css`
      border-radius: 50%;
    `}
`;

export const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LoadingSkeleton = Skeleton;
export default Skeleton;
