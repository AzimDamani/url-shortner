const express = require('express');
const router = express.Router();
const {generateShortUrl, getAllUrls, getAnalytics,  getAllShortUrl} = require('../controllers/url');
const URL = require('../models/url');
router.post('/', generateShortUrl);
router.get('/:shortId', getAllUrls)
router.get('/analytics/:shortId', getAnalytics);
router.get('/', getAllShortUrl)
module.exports = router;