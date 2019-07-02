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

exports.payLoan = functions.https.onCall(async data => {
  try {
    await db.doc(`loans/${data.loanId}`).update({ status: 'pending_payout' });
    const loanRef = await db.doc(`loans/${data.loanId}`).get();
    const loan = loanRef.data();
    const card = await stripe.customers.createSource(data.stripeId, {
      source: data.token,
    });
    await db.doc(`users/${data.id}`).update({ stripeCardId: card.id });
    const charge = await stripe.charges.create({
      amount: loan.total,
      currency: 'usd',
      source: card.id,
      description: `Loan payment for loan id ${loan.id}`,
    });
    const borrowerRef = await loan.borrower.get();
    const borrower = borrowerRef.data();
    const payout = await stripe.payouts.create({
      amount: loan.amount,
      currency: 'usd',
      destination: borrower.stripeCardId,
      method: 'instant',
      description: `Loan payment for loan id ${loan.id}`,
    });
    await db.doc(`loans/${data.loanId}`).update({
      status: 'loan_paid',
      loanPaymentChargeId: charge.id,
      loanPaymentPayoutId: payout.id,
    });
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err,
    };
  }
});
