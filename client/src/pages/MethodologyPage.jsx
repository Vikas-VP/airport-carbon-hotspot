import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMethodologyData } from '../api/methodologyApi';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { LoadingSkeleton, Skeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import {
  BookOpen,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  Database,
  FileCode,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FormulaCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => (theme.name === 'dark' ? '#0F172A' : '#1E293B')};
  color: #38BDF8;
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
  font-size: 0.8rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow-x: auto;
  line-height: 1.6;
  margin-top: 0.5rem;
`;

const DictTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  text-align: left;
  margin-top: 0.5rem;

  th, td {
    padding: 0.65rem 0.85rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
  }
`;

const ExceptionsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;

  li {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export function MethodologyPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await getMethodologyData();
        setData(response.data);
      } catch (err) {
        console.error('Failed to load methodology:', err);
        setError(err.message || 'Unable to retrieve methodology specifications');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton $height="3rem" $width="50%" $margin="0 0 1.5rem 0" />
        <Skeleton $height="200px" $radius="16px" $margin="0 0 1rem 0" />
        <Skeleton $height="200px" $radius="16px" $margin="0 0 1rem 0" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Methodology Document Unavailable"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Methodology & Calculation Assumptions"
        subtitle="Transparent documentation of synthetic datasets, emissions stoichiometry, ranking logic, and safety boundaries."
        badgeText="Documentation & Bounds"
        badgeVariant="primary"
        scopeNotice="Deterministic calculations executed in the backend service layer. Zero LLM hallucinations for numerical values."
      />

      <SectionWrapper>
        {/* Purpose & Operational Scope */}
        <Card>
          <CardHeader>
            <CardTitle>
              <BookOpen size={18} color="#0D9488" />
              <span>Problem Statement & Operational Source</span>
            </CardTitle>
          </CardHeader>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#475569' }}>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>Operational Emissions Source: Ground-Vehicle Stationary Idling.</strong> Airport sustainability and airside operations teams require clear visibility into stationary diesel fuel burn. When ground service vehicles (baggage tractors, belt loaders, passenger transfer buses, catering trucks, ground power units, maintenance vans) run engines during turnaround wait periods, stationary emissions accumulate rapidly.
            </p>
            <p>
              This application isolates <strong>avoidable idling</strong> from operationally mandatory runtime by comparing continuous stationary durations against a standard 15-minute operational baseline and rigorously excluding documented safety or servicing exceptions.
            </p>
          </div>
        </Card>

        {/* Mathematical Formulas */}
        <FormulaCard>
          <CardHeader>
            <CardTitle>
              <Calculator size={18} color="#0D9488" />
              <span>Emissions Calculation & Simulation Formulas</span>
            </CardTitle>
            <Badge $variant="success">Deterministic Business Logic</Badge>
          </CardHeader>

          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.5rem', color: '#0F172A' }}>
            1. Per-Activity Emissions Model
          </h4>
          <CodeBlock>
{`idleHours = idleMinutes / 60
fuelConsumedLiters = idleHours * fuelRateLitersPerHour
estimatedCo2Kg = fuelConsumedLiters * emissionFactorKgCo2PerLiter

avoidableIdleMinutes = isOperationalException ? 0 : Math.max(idleMinutes - allowedIdleMinutes, 0)
avoidableFuelLiters = (avoidableIdleMinutes / 60) * fuelRateLitersPerHour
avoidableCo2Kg = avoidableFuelLiters * emissionFactorKgCo2PerLiter`}
          </CodeBlock>

          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '1rem', color: '#0F172A' }}>
            2. Intervention Simulation Model
          </h4>
          <CodeBlock>
{`simulatedIdleMinutes = isOperationalException ? actualIdleMinutes : Math.min(actualIdleMinutes, targetIdleMinutes)
simulatedFuelLiters = (simulatedIdleMinutes / 60) * fuelRateLitersPerHour
simulatedCo2Kg = simulatedFuelLiters * emissionFactorKgCo2PerLiter

co2SavingsKg = Math.max(currentCo2Kg - simulatedCo2Kg, 0)
percentageReduction = currentCo2Kg > 0 ? (co2SavingsKg / currentCo2Kg) * 100 : 0`}
          </CodeBlock>

          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
            <strong>Assumed Emission Factor:</strong> {data.emissionFactor.value} {data.emissionFactor.unit} ({data.emissionFactor.fuelType}). Derived from DEFRA stationary diesel emission standards.
          </div>
        </FormulaCard>

        {/* Operational Exceptions */}
        <Card>
          <CardHeader>
            <CardTitle>
              <ShieldCheck size={18} color="#10B981" />
              <span>Operational Exceptions Policy (Zero-Rated Avoidability)</span>
            </CardTitle>
          </CardHeader>
          <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            {data.operationalExceptions.policy} Under no circumstance will the system recommend switching off a vehicle engaged in an approved exception:
          </p>
          <ExceptionsList>
            {data.operationalExceptions.approvedCategories.map((reason, i) => (
              <li key={i}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>{reason}</span>
              </li>
            ))}
          </ExceptionsList>
        </Card>

        {/* Severity Classification Rules */}
        <Card>
          <CardHeader>
            <CardTitle>
              <AlertTriangle size={18} color="#F59E0B" />
              <span>Deterministic Hotspot Severity Rules</span>
            </CardTitle>
          </CardHeader>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#475569' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              Severity labels are strictly rule-based without exaggerated claims:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>
                <strong style={{ color: '#E11D48' }}>High:</strong> Cumulative avoidable emissions &ge; 100 kg CO2 OR breach frequency &ge; 40%.
              </li>
              <li>
                <strong style={{ color: '#D97706' }}>Moderate:</strong> Cumulative avoidable emissions &ge; 40 kg CO2 OR breach frequency &ge; 20%.
              </li>
              <li>
                <strong style={{ color: '#059669' }}>Monitor:</strong> Below moderate thresholds; routine baseline surveillance.
              </li>
            </ul>
          </div>
        </Card>

        {/* Safety Boundaries */}
        <Card>
          <CardHeader>
            <CardTitle>
              <ShieldCheck size={18} color="#D97706" />
              <span>Airside Safety Boundaries & Limitations</span>
            </CardTitle>
          </CardHeader>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#475569' }}>
            {data.safetyBoundaries.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </Card>

        {/* Data Dictionary */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Database size={18} color="#0D9488" />
              <span>Synthetic Telemetry Data Dictionary</span>
            </CardTitle>
            <CardDescription>Schema definition for synthetic demonstration telemetry records</CardDescription>
          </CardHeader>

          <div style={{ overflowX: 'auto' }}>
            <DictTable>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.dataDictionary.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <code>{item.field}</code>
                    </td>
                    <td>
                      <Badge $size="sm">{item.type}</Badge>
                    </td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </DictTable>
          </div>
        </Card>
      </SectionWrapper>
    </div>
  );
}

export default MethodologyPage;
