const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

class Maps {
    constructor(lat, lng, modelBusiness ) {
        this.id = uuidv4();
        this.lat = lat;
        this.lng = lng;
        this.modelBusiness = modelBusiness;
        this.created_at = admin.firestore.FieldValue.serverTimestamp();
    }
}

module.exports = Maps;
