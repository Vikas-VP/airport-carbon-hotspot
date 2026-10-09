import React from 'react';
import styled from 'styled-components';
import { useToast } from '../../context/ToastContext';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { fadeIn } from '../../styles/animations';

const ToastStack = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 999;
  max-width: 420px;
  width: calc(100% - 3rem);
  pointer-events: none;
`;

const ToastItem = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${fadeIn} 0.2s ease-out;
`;

const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CloseButton = styled.button`
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border-radius: ${({ theme }) => theme.radius.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <ToastStack>
      {toasts.map((toast) => {
        let icon = <Info size={18} color="#0D9488" />;
        if (toast.type === 'success') icon = <CheckCircle2 size={18} color="#10B981" />;
        if (toast.type === 'warning') icon = <AlertTriangle size={18} color="#F59E0B" />;
        if (toast.type === 'error') icon = <XCircle size={18} color="#EF4444" />;

        return (
          <ToastItem key={toast.id}>
            <ToastContent>
              {icon}
              <span>{toast.message}</span>
            </ToastContent>
            <CloseButton onClick={() => removeToast(toast.id)} aria-label="Dismiss notification">
              <X size={14} />
            </CloseButton>
          </ToastItem>
        );
      })}
    </ToastStack>
  );
}

export default ToastContainer;

