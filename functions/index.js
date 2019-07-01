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
