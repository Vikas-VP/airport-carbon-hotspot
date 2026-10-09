import React from 'react';
import styled from 'styled-components';
import { Search, X } from 'lucide-react';

const Container = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.5rem 2rem 0.5rem 2.25rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.radius.full};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export function SearchInput({ value, onChange, onClear, placeholder = 'Search...', fullWidth = false, ...props }) {
  return (
    <Container $fullWidth={fullWidth}>
      <SearchIconWrapper>
        <Search size={16} />
      </SearchIconWrapper>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {value && (
        <ClearButton
          type="button"
          onClick={onClear}
          aria-label="Clear search query"
        >
          <X size={14} />
        </ClearButton>
      )}
    </Container>
  );
}

export default SearchInput;

