// models/Map.js
const firestore = require('../firebaseConfig');
const axios = require('axios');
const admin = require('firebase-admin'); // Import the admin object

class Map {
  constructor({ id, title, lat, lng, address, snippet }) {
    this.id = id;
    this.title = title;
    this.lat = lat;
    this.lng = lng;
    this.address = address;
    this.created_at = admin.firestore.FieldValue.serverTimestamp();
    this.snippet = snippet;
  }

  static async addMapData(data) {
    try {
      const locationDetails = await this.getLocationDetails(data.lat, data.lng);
      const mapData = { ...data, ...locationDetails, created_at: new Date() };
      const result = await firestore.collection('maps').add(mapData);
      return result.id;
    } catch (error) {
      console.error('Error adding map data:', error);
      throw error;
    }
  }

  static async getMapData() {
    try {
      const snapshot = await firestore.collection('maps').get();
      const data = [];
      snapshot.forEach((doc) => {
        data.push(new Map({ id: doc.id, ...doc.data() }));
      });
      return data;
    } catch (error) {
      console.error('Error getting map data:', error);
      throw error;
    }
  }

  static async getMapDataById(id) {
    try {
      const doc = await firestore.collection('maps').doc(id).get();
      if (!doc.exists) {
        throw new Error('Map data not found');
      }
      return new Map({ id: doc.id, ...doc.data() });
    } catch (error) {
      console.error(`Error getting map data by ID (${id}):`, error);
      throw error;
    }
  }

  static async getLocationDetails(lat, lng, apiKey) {
    try {
          const apiKey = 'AIzaSyA7z8qz40pOrKASz_H6L9jHU3lf4w2U-5U';
          const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );

      const place = response.data.results[0];
      const locationDetails = {
        address: place.formatted_address || '',
        latitude: lat,
        longitude: lng,
        state: getLocationComponent(place, 'administrative_area_level_1'),
        country: getLocationComponent(place, 'country'),
      };

      return locationDetails;
    } catch (error) {
      console.error('Error fetching location details:', error);
      throw error;
    }
  }
  
}
// Helper function to get location component by type
function getLocationComponent(place, type) {
  const component = place.address_components.find((component) =>
    component.types.includes(type)
  );

  return component ? component.long_name : '';
}

module.exports = Map;
