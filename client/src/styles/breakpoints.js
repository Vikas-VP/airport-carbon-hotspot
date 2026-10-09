export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1536px'
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`
};

