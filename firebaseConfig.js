// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'pre-project-capstone.firebaseapp.com', // replace with your Firebase project URL
});

module.exports = admin.firestore();
