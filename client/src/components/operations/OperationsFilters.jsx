import React from 'react';
import styled from 'styled-components';
import { Select } from '../common/Select';
import { SearchInput } from '../common/SearchInput';
import { Button } from '../common/Button';
import { Filter, RotateCcw } from 'lucide-react';
import { CLASSIFICATIONS } from '../../utils/constants';
import { media } from '../../styles/breakpoints';

const FilterBar = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;

  ${media.mobile} {
    width: 100%;
  }
`;

const FilterLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

const CountBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: auto;

  ${media.mobile} {
    margin-left: 0;
  }
`;

export function OperationsFilters({
  filters,
  onFilterChange,
  onResetFilters,
  terminals = [],
  gates = [],
  vehicleTypes = [],
  totalCount = 0
}) {
  return (
    <FilterBar>
      <FilterRow>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <SearchInput
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            onClear={() => onFilterChange('search', '')}
            placeholder="Search by vehicle ID, gate, or status..."
            fullWidth
          />
        </div>

        <FilterGroup>
          <FilterLabel>Terminal:</FilterLabel>
          <Select
            value={filters.terminalId}
            onChange={(e) => onFilterChange('terminalId', e.target.value)}
            placeholder="All Terminals"
            options={terminals.map((t) => ({ label: `Terminal ${t}`, value: t }))}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Gate:</FilterLabel>
          <Select
            value={filters.gateId}
            onChange={(e) => onFilterChange('gateId', e.target.value)}
            placeholder="All Gates"
            options={gates.map((g) => ({ label: `Gate ${g}`, value: g }))}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Vehicle Type:</FilterLabel>
          <Select
            value={filters.vehicleType}
            onChange={(e) => onFilterChange('vehicleType', e.target.value)}
            placeholder="All Types"
            options={vehicleTypes.map((v) => ({ label: v, value: v }))}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Status:</FilterLabel>
          <Select
            value={filters.classification}
            onChange={(e) => onFilterChange('classification', e.target.value)}
            placeholder="All Classifications"
            options={CLASSIFICATIONS.map((c) => ({ label: c, value: c }))}
          />
        </FilterGroup>

        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          icon={<RotateCcw size={14} />}
          title="Reset all filters"
        >
          Reset
        </Button>
      </FilterRow>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CountBadge>
          <span>Showing <strong>{totalCount}</strong> matching telemetry records</span>
        </CountBadge>
      </div>
    </FilterBar>
  );
}

export default OperationsFilters;

