import React, { useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { fadeIn } from '../../styles/animations';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 0.2s ease-out;
`;

const Dialog = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '600px'};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CloseButton = styled.button`
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
`;

export function Modal({ isOpen, onClose, title, children, footer, maxWidth }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <Dialog $maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle id="modal-title">{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </Dialog>
    </Overlay>
  );
}

export default Modal;

