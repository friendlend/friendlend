const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const stripe = require('stripe')(functions.config().stripe.secret);

exports.createStripeCustomer = functions.https.onCall(async data => {
  try {
    const customer = await stripe.accounts.create({
      type: 'custom',
      email: data.email,
      metadata: { userId: data.id },
      individual: { first_name: data.name },
      business_type: 'individual',
      requested_capabilities: ['platform_payments', 'card_payments'],
      tos_acceptance: {
        date: Date.now(),
        ip: '97.80.80.201',
      },
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
    const card = await stripe.accounts.update(data.stripeId, {
      external_account: data.token,
    });
    await db.doc(`users/${data.id}`).update({ card });
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
    await db
      .doc(`loans/${data.loanId}`)
      .update({ loanStatus: 'pending_payout' });
    const loanRef = await db.doc(`loans/${data.loanId}`).get();
    const loan = loanRef.data();
    // const card = await stripe.accounts.update(data.stripeId, {
    //   external_account: data.token,
    // });
    // await db.doc(`users/${data.userId}`).update({ card: card });
    const borrowerRef = await loan.borrower.get();
    const borrower = borrowerRef.data();
    const charge = await stripe.charges.create({
      amount: loan.total,
      currency: 'usd',
      source: data.token,
      description: `Loan payment for loan id ${loanRef.id}`,
      transfer_data: {
        destination: borrower.stripeId,
        amount: loan.amount,
      },
    });
    // const payout = await stripe.transfers.create({
    //   amount: loan.amount,
    //   currency: 'usd',
    //   destination: borrower.stripeId,
    //   source_transaction: charge.id,
    //   description: `Loan payment for loan id ${loan.id}`,
    // });
    await db.doc(`loans/${data.loanId}`).update({
      loanStatus: 'loan_paid',
      loanPaymentChargeId: charge.id,
      //   loanPaymentPayoutId: payout.id,
      lender: db.doc(`users/${data.userId}`),
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
