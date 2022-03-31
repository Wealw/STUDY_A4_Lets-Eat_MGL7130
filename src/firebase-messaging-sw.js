//my-service-worker.js
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyD0vBu1QQw6FffaxHqM048LdtmaPDNpic8",
  authDomain: "letseat-bc283.firebaseapp.com",
  projectId: "letseat-bc283",
  storageBucket: "letseat-bc283.appspot.com",
  messagingSenderId: "10147661197",
  appId: "1:10147661197:web:d9218bfd3000e15451e9c4"
})

const messaging = firebase.messaging()
