import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';

const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: help;
`;

const TooltipBubble = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => (theme.name === 'dark' ? '#1E293B' : '#0F172A')};
  color: #FFFFFF;
  padding: 0.4rem 0.75rem;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: 1.4;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
  white-space: normal;
  width: max-content;
  max-width: 240px;
  z-index: 50;
  pointer-events: none;
  animation: ${fadeIn} 0.15s ease-out;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => (theme.name === 'dark' ? '#1E293B' : '#0F172A')} transparent transparent transparent;
  }
`;

export function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  if (!text) return children;

  return (
    <TooltipWrapper
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      role="tooltip"
      aria-label={text}
    >
      {children}
      {visible && <TooltipBubble>{text}</TooltipBubble>}
    </TooltipWrapper>
  );
}

export default Tooltip;

