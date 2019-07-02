import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { firebase } from "../../firebase";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = async ev => {
    let token = await this.props.stripe.createToken();

    const createStripeCard = firebase
      .functions()
      .httpsCallable("createStripeCard");
    const stripeResonse = await createStripeCard({
      stripeId: "cus_FMZHpmd2gTHWnc",
      token
    });

    console.log(stripeResonse);
  };

  render() {
    return (
      <div className="checkout">
        <p>Where should we send the money?</p>
        <CardElement style={{ fontSize: "2rem" }} />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
