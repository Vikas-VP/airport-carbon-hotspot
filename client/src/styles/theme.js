import { breakpoints } from './breakpoints';

const common = {
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    monoFontFamily: "'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem'  // 36px
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    }
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '2.5rem',// 40px
    '3xl': '3rem'   // 48px
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  transitions: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.25s ease-in-out',
    slow: 'all 0.4s ease-in-out'
  },
  breakpoints
};

export const lightTheme = {
  ...common,
  name: 'light',
  colors: {
    background: '#F6F9FC',
    backgroundAlt: '#EDF2F7',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#F1F5F9',
    surfaceHover: '#E2E8F0',
    primary: '#0D9488', // professional airside teal
    primaryHover: '#0F766E',
    primaryLight: '#CCFBF1',
    secondary: '#0284C7', // sky blue
    secondaryHover: '#0369A1',
    accent: '#3B82F6',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    border: '#E2E8F0',
    borderFocus: '#0D9488',
    success: '#059669',
    successBg: '#D1FAE5',
    warning: '#D97706',
    warningBg: '#FEF3C7',
    danger: '#E11D48', // Coral for excessive alert
    dangerBg: '#FFE4E6',
    info: '#2563EB',
    infoBg: '#DBEAFE',
    chartSeries: {
      primary: '#0D9488',
      secondary: '#0284C7',
      danger: '#E11D48',
      warning: '#F59E0B',
      success: '#10B981',
      indigo: '#6366F1',
      slate: '#94A3B8'
    },
    overlay: 'rgba(15, 23, 42, 0.4)',
    cardGlow: '0 4px 20px -2px rgba(13, 148, 136, 0.08)'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
    md: '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -1px rgba(15, 23, 42, 0.04)',
    lg: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
    xl: '0 20px 25px -5px rgba(15, 23, 42, 0.09), 0 10px 10px -5px rgba(15, 23, 42, 0.03)'
  }
};

export const darkTheme = {
  ...common,
  name: 'dark',
  colors: {
    background: '#0B132B', // Deep blue-charcoal
    backgroundAlt: '#111D40',
    surface: '#152238',
    surfaceElevated: '#1C2C4C',
    surfaceMuted: '#1E293B',
    surfaceHover: '#2A3C5E',
    primary: '#14B8A6',
    primaryHover: '#2DD4BF',
    primaryLight: 'rgba(20, 184, 166, 0.15)',
    secondary: '#38BDF8',
    secondaryHover: '#7DD3FC',
    accent: '#60A5FA',
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    border: '#2A3C5E',
    borderFocus: '#14B8A6',
    success: '#10B981',
    successBg: 'rgba(16, 185, 129, 0.18)',
    warning: '#F59E0B',
    warningBg: 'rgba(245, 158, 11, 0.18)',
    danger: '#FB7185',
    dangerBg: 'rgba(251, 113, 133, 0.20)',
    info: '#60A5FA',
    infoBg: 'rgba(96, 165, 250, 0.18)',
    chartSeries: {
      primary: '#14B8A6',
      secondary: '#38BDF8',
      danger: '#FB7185',
      warning: '#FBBF24',
      success: '#34D399',
      indigo: '#818CF8',
      slate: '#64748B'
    },
    overlay: 'rgba(3, 7, 18, 0.7)',
    cardGlow: '0 4px 20px -2px rgba(20, 184, 166, 0.15)'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)'
  }
};

