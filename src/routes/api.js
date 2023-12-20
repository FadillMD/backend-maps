const express = require('express');
const { postLocation } = require('../controllers/mapsController');
const { registerPartner, getAllPartner, getPartnerById } = require('../controllers/partnerController');

const router = express.Router();

//maps partner recomend
router.post('/maps/recommendation', postLocation);

router.post('/maps/partner', registerPartner);
router.get('/maps/partner', getAllPartner);
router.get('/maps/partner/:id', getPartnerById);

module.exports = {
    routes: router
}