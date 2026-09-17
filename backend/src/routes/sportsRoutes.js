const express = require('express');
const router = express.Router();
const { getSports, getSportsNews } = require('../controllers/sportsController');

router.get('/', getSports);
router.get('/news', getSportsNews);

module.exports = router;
