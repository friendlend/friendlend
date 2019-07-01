import React, { useState } from "react";
import { StyledCardForm } from "./CardForm.styled";

export default function CardForm() {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    cvs: "",
    cardNumber: "",
    month: "0" + (new Date().getMonth() + 1),
    year: new Date()
      .getFullYear()
      .toString()
      .substr(-2)
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCardInfo(prevCardInfo => {
      return { ...prevCardInfo, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  // takes the form field value and returns true on valid number
  function valid_credit_card(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0,
      nDigit = 0,
      bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 == 0;
  }

  return (
    <>
      <StyledCardForm>
        <h2>Where should we send the money?</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className={"name"}>
                <p>Name on card</p>
                <input
                  onChange={handleChange}
                  name={"name"}
                  value={cardInfo.name}
                />
              </div>

              <div className={"cvs"}>
                <p>CVS</p>
                <input
                  maxLength={"3"}
                  onChange={handleChange}
                  name={"cvs"}
                  value={cardInfo.cvs}
                />
              </div>
            </div>

            <p>Card Number</p>
            <input
              name={"cardNumber"}
              placeholder={"xxxx-xxxx-xxxx-xxxx"}
              value={cardInfo.cardNumber}
              onChange={handleChange}
            />
            {
              <small>
                {valid_credit_card(cardInfo.cardNumber)
                  ? null
                  : "Invalid Credit Card"}
              </small>
            }

            <p>Expire Date</p>
            <div className="expireDate">
              <div>
                <p>Month</p>

                <input value={cardInfo.month} onChange={handleChange} />
              </div>
              <div>
                <p>Year</p>
                <input value={cardInfo.year} onChange={handleChange} />
              </div>
            </div>

            <div>
              <button> Finish</button>
            </div>
          </form>
        </div>
      </StyledCardForm>
    </>
  );
}
