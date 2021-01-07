const firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyCY52m1C3amEybPtdN8vQlcyyo4gaJMr1w",
    authDomain: "restaurant-dev-3c85f.firebaseapp.com",
    projectId: "restaurant-dev-3c85f",
    storageBucket: "restaurant-dev-3c85f.appspot.com",
    messagingSenderId: "380460741012",
    appId: "1:380460741012:web:8ac6f740d4a30de14e1f81",
    measurementId: "G-W2D2XC70HQ"
};
var admin = require("firebase-admin");

var serviceAccount = require('../secretKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

firebase.default.initializeApp(firebaseConfig)
const auth = firebase.default.auth()
const firestore = admin.firestore()

firestore.collection('users').add({name: 'ali'})
module.exports  = {
    auth,
    firestore
}