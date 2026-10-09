import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

const SelectContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.5rem 2.25rem 0.5rem 0.875rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  width: 100%;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  option {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
`;

export function Select({ options = [], value, onChange, placeholder, fullWidth = false, id, name, ariaLabel, ...props }) {
  return (
    <SelectContainer $fullWidth={fullWidth}>
      <StyledSelect
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const label = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {label}
            </option>
          );
        })}
      </StyledSelect>
      <IconWrapper>
        <ChevronDown size={16} />
      </IconWrapper>
    </SelectContainer>
  );
}

export default Select;

