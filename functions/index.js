const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

let db = admin.firestore();

async function sendMessageToAll(payload) {
  try {
    const snapshot = await db.collection('deviceId').get()
    const deviceIds = snapshot.docs.map(doc => doc.data())
    deviceIds.forEach((deviceId) => {
      admin.messaging().sendToDevice(deviceId.deviceId, payload)
    })
  } catch (_) {
  }

  return null;
}

exports.sendMessageForMidday = functions.pubsub.schedule('45 11 * * *').onRun(async (context) => {
  const payload = {notification: {title: "C'est l'heure de manger avec Lets Eat", body: "Choisissez dès maintenant votre restaurant pour ce midi !"}}
  return await sendMessageToAll(payload)
});

exports.sendMessageForEvening = functions.pubsub.schedule('45 18 * * *').onRun(async (context) => {
  const payload = {notification: {title: "Déjà le soir ! Une petite faim ?", body: "Choisissez dès maintenant votre restaurant pour ce soir avec Lets-Eat !"}}
  return await sendMessageToAll(payload);
});


