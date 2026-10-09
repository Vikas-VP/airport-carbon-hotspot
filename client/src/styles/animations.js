import { keyframes, css } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(225, 29, 72, 0);
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
`;

