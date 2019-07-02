import React from "react";
import { Elements } from "react-stripe-elements";
import CardForm from "./CardForm/CardFormStripe";

export default function StripeCardForm() {
  return (
    <Elements>
      <CardForm />
    </Elements>
  );
}
