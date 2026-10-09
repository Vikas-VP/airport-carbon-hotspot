import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { BookOpen, ShieldCheck, Fuel, AlertOctagon, Cpu } from 'lucide-react';
import { media } from '../../styles/breakpoints';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const AssumptionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const AssumptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const AssumptionDetail = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.45;
`;

const FormulaCodeBlock = styled.div`
  background-color: ${({ theme }) => (theme.name === 'dark' ? '#0F172A' : '#1E293B')};
  color: #38BDF8;
  font-family: ${({ theme }) => theme.typography.monoFontFamily};
  font-size: 0.75rem;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
  overflow-x: auto;
`;

export function AssumptionsPanel({ assumptions }) {
  return (
    <Card style={{ marginBottom: '1.5rem' }}>
      <CardHeader>
        <CardTitle>
          <BookOpen size={18} color="#0D9488" />
          <span>Transparent Calculation Assumptions & Boundaries</span>
        </CardTitle>
      </CardHeader>

      <Grid>
        <AssumptionBox>
          <AssumptionHeader>
            <Fuel size={16} color="#0D9488" />
            <span>Combustion Emission Factor</span>
          </AssumptionHeader>
          <AssumptionDetail>
            Configured default of <strong>2.68 kg CO2 per liter</strong> of diesel fuel, derived from DEFRA standard stationary diesel combustion stoichiometry. Configurable demonstration constant.
          </AssumptionDetail>
        </AssumptionBox>

        <AssumptionBox>
          <AssumptionHeader>
            <ShieldCheck size={16} color="#10B981" />
            <span>Zero-Rated Exceptions</span>
          </AssumptionHeader>
          <AssumptionDetail>
            Approved operational exceptions (safety checks, passenger boarding AC, medical/emergency, reefer catering) are strictly assigned <strong>0 avoidable minutes</strong> and omitted from intervention caps.
          </AssumptionDetail>
        </AssumptionBox>

        <AssumptionBox>
          <AssumptionHeader>
            <AlertOctagon size={16} color="#D97706" />
            <span>Deterministic Business Logic</span>
          </AssumptionHeader>
          <AssumptionDetail>
            Emissions and potential savings are calculated using explicit deterministic formulas in the backend service layer. No generative LLMs or stochastic models are used for calculations.
          </AssumptionDetail>
        </AssumptionBox>

        <AssumptionBox>
          <AssumptionHeader>
            <Cpu size={16} color="#6366F1" />
            <span>Synthetic Demonstration Data</span>
          </AssumptionHeader>
          <AssumptionDetail>
            All records, vehicle identifiers, and gate geometries are synthetic demonstration entities. No physical airfield telemetry or operational vehicle control is exerted.
          </AssumptionDetail>
        </AssumptionBox>
      </Grid>

      <FormulaCodeBlock>
        {`// Mathematical Model:
idleHours = idleMinutes / 60
fuelBurnLiters = idleHours * fuelRateLitersPerHour
estimatedCo2Kg = fuelBurnLiters * 2.68 kg/L
avoidableMinutes = isException ? 0 : Math.max(idleMinutes - allowedThreshold, 0)
avoidableCo2Kg = (avoidableMinutes / 60) * fuelRate * 2.68`}
      </FormulaCodeBlock>
    </Card>
  );
}

export default AssumptionsPanel;

