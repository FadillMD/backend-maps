const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

class Partner {
    constructor(partnerName, phoneNumber, city ) {
        this.id = uuidv4();
        this.partnerName = partnerName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.created_at = admin.firestore.FieldValue.serverTimestamp();
    }
}

module.exports = Partner;
