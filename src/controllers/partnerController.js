const firebase = require('../../db');
const Partner = require('../models/Partner');
const admin = require("firebase-admin");
const config = require('../../config');
// const credentials = require("../../serviceAccountKey.json");

//     admin.initializeApp({
//         credential: admin.credential.cert(credentials)
//     });

const firestore = admin.firestore();

const registerPartner = async (req, res, next) => {
    try {
        const requestBody = req.body;
        const userData = {
            ...requestBody,
            created_at: admin.firestore.FieldValue.serverTimestamp(),
        };

        await firestore.collection('partner').doc().set(userData);

        res.json({
            success: true,
            message: 'Successfully saving data Partner',
        });

    } catch (error) {
        console.error('Error saving location data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const getAllPartner = async (req, res, next) => {
    try {
        const partnerCollection = firestore.collection('partner');
        const data = await partnerCollection.get();

        if (data.empty) {
            return res.status(404).json({ success: false, message: 'No user record found' });
        }

        const partnerArray = data.docs.map(doc => {
            const partnerData = doc.data();
            const user = {
                id: doc.id,
                partnerName: partnerData.partnerName,
                phoneNumber: partnerData.phoneNumber,
                city: partnerData.city,
                created_at: partnerData.created_at,
            };
            return user;
        });

        return res.json({
            success: true,
            message: 'User data has been successfully accepted',
            data: usersArray,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getPartnerById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const partner = await firestore.collection('partner').doc(id);
        const data = await partner.get();

        if (!data.exists) {
            return res.status(404).json({ success: false, message: 'Partner with the given ID not found' });
        } else {
            const partnerData = data.data();
            const partnerResponse = {
                id: data.id,
                namePartner: partnerData.namePartner,
                phoneNumber:  partnerData.phoneNumber,
                city: partnerData.city,
                created_at: partnerData.created_at
            };

            res.json({
            success: true,
            message: 'Partner data based on ID has been successfully retrieved',
            data: partnerResponse,
            });
        }
    } catch (error) {
        console.error('Error fetching Partner data by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


module.exports = {
    registerPartner,
    getAllPartner,
    getPartnerById
}