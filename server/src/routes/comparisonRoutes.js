const express = require('express');
const router = express.Router();
const { getComparison } = require('../controllers/comparisonController');
const asyncHandler = require('../utils/asyncHandler');

router.get('/comparison', asyncHandler(getComparison));

module.exports = router;

