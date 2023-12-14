// controllers/mapController.js
const Map = require('../models/Map');
const LocationView = require('../controllers/locationView');

const getLocationDetails = async (req, res) => {
  const { lat, lng } = req.body;
  const apiKey = 'AIzaSyA7z8qz40pOrKASz_H6L9jHU3lf4w2U-5U';

  try {
    const locationDetails = await Map.getLocationDetails(lat, lng, apiKey);
    // res.json(locationDetails);
    LocationView.renderLocationDetails(res, locationDetails);
  } catch (error) {
    console.error('Error in controller:', error);
    LocationView.renderError(res, 'Internal Server Error');
    // res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addMapData = async (req, res) => {
  try {
    const { lat, lng , title } = req.body;
    const mapId = await Map.addMapData({ lat, lng, title });
    res.status(201).json({ id: mapId, lat, lng, title });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMapData = async (req, res) => {
  try {
    const mapData = await Map.getMapData();
    res.status(200).json(mapData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMapDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const mapData = await Map.getMapDataById(id);
    res.status(200).json(mapData);
  } catch (error) {
    res.status(404).json({ error: 'Map data not found' });
  }
};



module.exports = { addMapData, getMapData, getMapDataById, getLocationDetails };
