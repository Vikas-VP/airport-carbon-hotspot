const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✈️  Airport Carbon Hotspot API Server Running`);
  console.log(`🚀 Mode: ${NODE_ENV}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔍 Health: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

