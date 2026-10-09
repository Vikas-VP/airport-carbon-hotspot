const express = require('express');
const router = express.Router();
const { getMethodology } = require('../controllers/methodologyController');
const asyncHandler = require('../utils/asyncHandler');

router.get('/methodology', asyncHandler(getMethodology));

module.exports = router;

