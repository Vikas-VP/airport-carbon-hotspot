import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Tooltip } from '../common/Tooltip';
import { MobileOperationCard } from './MobileOperationCard';
import { EmptyState } from '../common/EmptyState';
import { LoadingSkeleton, Skeleton } from '../common/LoadingSkeleton';
import { formatDateTime, formatMinutes, formatCo2, formatFuel } from '../../utils/formatters';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ShieldCheck,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { media } from '../../styles/breakpoints';

const TableContainer = styled(Card)`
  padding: 0;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DesktopWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  ${media.tablet} {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  padding: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Th = styled.th`
  padding: 0.75rem 0.85rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  letter-spacing: 0.02em;
  user-select: none;

  ${({ $sortable }) =>
    $sortable &&
    css`
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.colors.textPrimary};
      }
    `}
`;

const ThContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const TableBody = styled.tbody`
  & tr:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Tr = styled.tr`
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }

  ${({ $isExcessive, theme }) =>
    $isExcessive &&
    css`
      background-color: ${theme.name === 'dark' ? 'rgba(225, 29, 72, 0.08)' : '#FFF1F2'};
      &:hover {
        background-color: ${theme.name === 'dark' ? 'rgba(225, 29, 72, 0.14)' : '#FFE4E6'};
      }
    `}
`;

const Td = styled.td`
  padding: 0.75rem 0.85rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  vertical-align: middle;
`;

const MonoSpan = styled.span`
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
  font-size: 0.75rem;
`;

const PaginationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.65rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? '#ffffff' : theme.colors.textPrimary)};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export function OperationsTable({
  records = [],
  loading = false,
  page = 1,
  totalPages = 1,
  totalRecords = 0,
  onPageChange,
  sortBy = 'timestamp',
  sortOrder = 'desc',
  onSortChange
}) {
  if (loading) {
    return (
      <Card style={{ padding: '2rem' }}>
        <Skeleton $height="2.5rem" $margin="0 0 1rem 0" />
        <Skeleton $height="1.5rem" $margin="0 0 0.5rem 0" />
        <Skeleton $height="1.5rem" $margin="0 0 0.5rem 0" />
        <Skeleton $height="1.5rem" $margin="0 0 0.5rem 0" />
        <Skeleton $height="1.5rem" $margin="0 0 0.5rem 0" />
      </Card>
    );
  }

  if (!records.length) {
    return (
      <EmptyState
        title="No Telemetry Records Found"
        message="No ground vehicle records match the active filters. Try clearing or relaxing filter criteria."
      />
    );
  }

  const renderSortHeader = (label, key) => (
    <Th $sortable onClick={() => onSortChange(key)}>
      <ThContent>
        <span>{label}</span>
        <ArrowUpDown size={12} opacity={sortBy === key ? 1 : 0.4} />
      </ThContent>
    </Th>
  );

  return (
    <TableContainer>
      <DesktopWrapper>
        <StyledTable>
          <TableHead>
            <tr>
              {renderSortHeader('Date & Time', 'timestamp')}
              <Th>Terminal</Th>
              <Th>Gate</Th>
              {renderSortHeader('Vehicle ID', 'vehicleId')}
              <Th>Vehicle Type</Th>
              <Th>Operational Status</Th>
              {renderSortHeader('Idle Time', 'idleMinutes')}
              <Th>Threshold</Th>
              <Th>Fuel Rate</Th>
              {renderSortHeader('Total CO2', 'estimatedCo2Kg')}
              {renderSortHeader('Avoidable CO2', 'avoidableCo2Kg')}
              <Th>Classification</Th>
            </tr>
          </TableHead>
          <TableBody>
            {records.map((r) => {
              const isExcessive = r.classification === 'Excessive' && !r.isOperationalException;
              const badgeVariant = r.isOperationalException
                ? 'info'
                : r.classification === 'Excessive'
                ? 'danger'
                : r.classification === 'Review'
                ? 'warning'
                : 'success';

              return (
                <Tr key={r.id} $isExcessive={isExcessive}>
                  <Td>
                    <MonoSpan>{formatDateTime(r.timestamp)}</MonoSpan>
                  </Td>
                  <Td>Terminal {r.terminalId}</Td>
                  <Td>
                    <MonoSpan>{r.gateId}</MonoSpan>
                  </Td>
                  <Td>
                    <MonoSpan style={{ fontWeight: 600 }}>{r.vehicleId}</MonoSpan>
                  </Td>
                  <Td>{r.vehicleType}</Td>
                  <Td>
                    {r.isOperationalException ? (
                      <Tooltip text={`Exception reason: ${r.exceptionReason}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6366F1' }}>
                          <ShieldCheck size={14} />
                          <span>{r.exceptionReason}</span>
                        </span>
                      </Tooltip>
                    ) : (
                      <span>{r.operationalStatus}</span>
                    )}
                  </Td>
                  <Td>
                    <MonoSpan style={{ fontWeight: isExcessive ? 700 : 500, color: isExcessive ? '#E11D48' : 'inherit' }}>
                      {formatMinutes(r.idleMinutes)}
                    </MonoSpan>
                  </Td>
                  <Td>
                    <MonoSpan>{r.allowedIdleMinutes}m</MonoSpan>
                  </Td>
                  <Td>
                    <MonoSpan>{r.fuelRateLitersPerHour} L/h</MonoSpan>
                  </Td>
                  <Td>
                    <MonoSpan>{formatCo2(r.estimatedCo2Kg)}</MonoSpan>
                  </Td>
                  <Td>
                    <MonoSpan style={{ fontWeight: r.avoidableCo2Kg > 0 ? 700 : 400, color: r.avoidableCo2Kg > 0 ? '#E11D48' : '#64748B' }}>
                      {formatCo2(r.avoidableCo2Kg)}
                    </MonoSpan>
                  </Td>
                  <Td>
                    <Badge $variant={badgeVariant} $size="sm">
                      {r.isOperationalException ? 'Exception' : r.classification}
                    </Badge>
                  </Td>
                </Tr>
              );
            })}
          </TableBody>
        </StyledTable>
      </DesktopWrapper>

      {/* Mobile Card view */}
      <MobileWrapper>
        {records.map((r) => (
          <MobileOperationCard key={r.id} record={r} />
        ))}
      </MobileWrapper>

      {/* Pagination Footer */}
      <PaginationFooter>
        <PageInfo>
          Page {page} of {totalPages} ({totalRecords} total items)
        </PageInfo>
        <PaginationButtons>
          <PageBtn
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </PageBtn>
          <PageBtn
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </PageBtn>
        </PaginationButtons>
      </PaginationFooter>
    </TableContainer>
  );
}

export default OperationsTable;

