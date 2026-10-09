import React, { useState, useEffect, useCallback } from 'react';
import { useAirport } from '../context/AirportContext';
import { getOperations } from '../api/operationApi';
import { PageHeader } from '../components/common/PageHeader';
import { OperationsFilters } from '../components/operations/OperationsFilters';
import { OperationsTable } from '../components/operations/OperationsTable';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { Download, RefreshCw } from 'lucide-react';

const initialFilters = {
  terminalId: '',
  gateId: '',
  vehicleType: '',
  classification: '',
  date: '',
  minIdleMinutes: '',
  search: ''
};

export function OperationsPage() {
  const { selectedAirportId, selectedAirport } = useAirport();
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const [records, setRecords] = useState([]);
  const [meta, setMeta] = useState({
    totalRecords: 0,
    totalPages: 1,
    availableTerminals: [],
    availableGates: [],
    availableVehicleTypes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOperations = useCallback(async () => {
    if (!selectedAirportId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getOperations(selectedAirportId, {
        ...filters,
        page,
        limit: 15,
        sortBy,
        sortOrder
      });
      setRecords(response.data || []);
      setMeta(response.meta || {});
    } catch (err) {
      console.error('Error fetching operational telemetry:', err);
      setError(err.message || 'Failed to load telemetry records');
    } finally {
      setLoading(false);
    }
  }, [selectedAirportId, filters, page, sortBy, sortOrder]);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations]);

  // Reset page when airport or filters change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const handleSortChange = (key) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
    setPage(1);
  };

  // CSV download feature
  const exportToCsv = () => {
    if (!records.length) return;
    const headers = [
      'Record ID',
      'Timestamp',
      'Airport',
      'Terminal',
      'Gate',
      'Vehicle ID',
      'Vehicle Type',
      'Status',
      'Idle Minutes',
      'Allowed Minutes',
      'Fuel Rate (L/h)',
      'Estimated CO2 (kg)',
      'Avoidable CO2 (kg)',
      'Classification',
      'Is Exception',
      'Exception Reason'
    ];
    const rows = records.map((r) => [
      r.id,
      r.timestamp,
      selectedAirport?.code,
      r.terminalId,
      r.gateId,
      r.vehicleId,
      `"${r.vehicleType}"`,
      `"${r.operationalStatus || ''}"`,
      r.idleMinutes,
      r.allowedIdleMinutes,
      r.fuelRateLitersPerHour,
      r.estimatedCo2Kg,
      r.avoidableCo2Kg,
      r.classification,
      r.isOperationalException,
      `"${r.exceptionReason || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `operations_${selectedAirport?.code || 'airport'}_page_${page}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <PageHeader
        title={`Airside Operations Explorer: ${selectedAirport?.name || 'Airport'}`}
        subtitle="Filter and inspect individual ground-support telemetry records, fuel burn, and idle classifications"
        badgeText="Raw Telemetry"
        badgeVariant="primary"
        scopeNotice="Operational exceptions (safety checks, reefer catering, embarkation AC) are zero-rated for avoidable carbon."
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCsv}
              icon={<Download size={14} />}
              disabled={!records.length}
            >
              Export CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchOperations}
              icon={<RefreshCw size={14} />}
            >
              Refresh
            </Button>
          </div>
        }
      />

      <OperationsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        terminals={meta.availableTerminals}
        gates={meta.availableGates}
        vehicleTypes={meta.availableVehicleTypes}
        totalCount={meta.totalRecords}
      />

      {error ? (
        <ErrorState
          title="Failed to Load Operations"
          message={error}
          onRetry={fetchOperations}
        />
      ) : (
        <OperationsTable
          records={records}
          loading={loading}
          page={page}
          totalPages={meta.totalPages || 1}
          totalRecords={meta.totalRecords || 0}
          onPageChange={setPage}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}
    </div>
  );
}

export default OperationsPage;
