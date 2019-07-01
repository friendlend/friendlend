const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const stripe = require('stripe')(functions.config().stripe.secret);

exports.createStripeCustomer = functions.https.onCall(async data => {
  try {
    const customer = await stripe.customers.create({
      email: data.email,
      description: `Customer for user id ${data.id}`,
    });
    await db.doc(`users/${data.id}`).update({ stripeId: customer.id });
    return {
      success: true,
      stripeId: customer.id,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err,
    };
  }
});

exports.createStripeCard = functions.https.onCall(async data => {
  try {
    const card = await stripe.customers.createSource(data.stripeId, {
      source: data.token,
    });
    await db.doc(`users/${data.id}`).update({ stripeCardId: card.id });
    return {
      success: true,
      stripeCardId: card.id,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err,
    };
  }
});
