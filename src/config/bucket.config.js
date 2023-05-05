const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./admin.config.json");

const config = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

module.exports = { config };
