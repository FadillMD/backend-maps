// controllers/mapController.js
const Map = require('../models/Map');

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

module.exports = { addMapData, getMapData, getMapDataById };
