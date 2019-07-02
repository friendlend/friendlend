import { Link, Redirect, Router } from "@reach/router";
import React from "react";
import styled from "styled-components";
import MyStoreCheckout from "./component/CardForm/CheckoutPage";
import { auth } from "./firebase";
import * as mq from "./styles/media-queries";
console.log(mq);
const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 880px;
  grid-gap: 1em;
  margin: 0 auto;
  border: 2px solid black;
  ${mq.small} {
    border: 2px solid rebeccapurple;
    background-color: yellow;
  }
`;
const AuthenticatedApp = () => {
  return (
    <Container>
      <Nav />
      <p>Authenticated!</p>
      <Routes />
    </Container>
  );
};

function Routes() {
  return (
    <Router>
      {/* <Redirector path="/" /> */}
      <Placeholder path="/" />
      <NotFound default />
      <MyStoreCheckout path="/cardform" />
    </Router>
  );
}
function Nav() {
  return (
    <>
      <Link to="/cardform">CardForm</Link>
      <Link to="/">Home</Link>
      <button onClick={() => auth().signOut()}>signout</button>
    </>
  );
}
function Placeholder() {
  return <p>Placeholder Page</p>;
}
function NotFound() {
  return <p>Not found</p>;
}
function Redirector() {
  return <Redirect to="/something" />;
}
export default AuthenticatedApp;
