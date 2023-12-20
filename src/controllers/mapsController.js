const firebase = require('../../db');
const Maps = require('../models/Maps');
const admin = require("firebase-admin");
const config = require('../../config');
const credentials = require("../../serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(credentials)
    });

const firestore = admin.firestore();

const postLocation = async (req, res, next) => {
    try {
        const requestBody = req.body;
        const userData = {
            ...requestBody,
            created_at: admin.firestore.FieldValue.serverTimestamp(),
        };

        await firestore.collection('maps').doc().set(userData);

        try {
            const otherEndpointResponse = await axios.post('https://other-endpoint.com', requestBody);
            console.log('Response from other endpoint:', otherEndpointResponse.data);
        } catch (error) {
            console.error('Error sending to other endpoint:', error.message);
        }

        res.json({
            success: true,
            message: 'Successfully saving and post data to model',
        });

    } catch (error) {
        console.error('Error saving location data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    postLocation,

}