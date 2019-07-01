import styled from "styled-components";

export const StyledCardForm = styled.div`
  margin: 0 auto;
  width: 95%;

  form {
    width: 100%;
  }

  input {
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 3px;
    height: 25px;
    font-size: 1.6rem;
  }

  .name {
    width: 60%;
  }

  .cvs {
    width: 25%;
  }

  .expireDate {
    justify-content: space-between;
    width: 15%;
  }

  div > p {
    margin: 0;
  }

  form > div {
    justify-content: space-between;
    width: 100%;
    display: flex;
  }

  form > p {
    margin-bottom: 0;
  }

  small {
    color: red;
  }

  button {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    border: 1px solid lightgray;
  }

  button:hover {
    background-color: lightblue;
  }

  p {
    font-weight: 600;
  }
`;
