const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'socialmedia-1b488.firebasestorage.app',
});

module.exports = admin;