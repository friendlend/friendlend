import React from "react";
import ReactDOM from "react-dom";
import { StripeProvider } from "react-stripe-elements";
import App from "./App";
import { UserProvider } from "./context/auth-context";
ReactDOM.render(
  <StripeProvider apiKey="`pk_test_1BNragQ8h4rFIfllntsqJTKd00davGOhpN`">
    <UserProvider>
      <App />
    </UserProvider>
  </StripeProvider>,
  document.getElementById("root")
);
