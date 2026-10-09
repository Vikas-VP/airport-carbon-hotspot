const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'Airport Carbon Hotspot API',
      environment: process.env.NODE_ENV || 'development'
    },
    message: 'Server is healthy and operational'
  });
});

module.exports = router;

