// locationView.js
class LocationView {
    static renderLocationDetails(res, locationDetails) {
      res.json(locationDetails);
    }
  
    static renderError(res, message) {
      res.status(500).json({ error: message });
    }
  }
  
  module.exports = LocationView;
  