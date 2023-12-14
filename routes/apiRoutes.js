const express = require('express');
const mapController = require('../controllers/mapController');

const router = express.Router();

router.post('/maps', mapController.addMapData);
router.get('/maps', mapController.getMapData); // New route to fetch map data
router.get('/maps/:id', mapController.getMapDataById); // New route to get map data by ID

module.exports = router;
