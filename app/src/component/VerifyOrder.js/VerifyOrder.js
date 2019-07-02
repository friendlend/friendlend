import React, { useState } from "react";

export default function VerifyOrder() {
  const [borrowInfo, setBorrowInfo] = useState({
    amount: 500,
    lastFourCard: 3888
  });
  return (
    <div>
      <h2>This is the order</h2>
      <p>Amount: {borrowInfo.amount}</p>
      <p>Last four of card: {borrowInfo.lastFourCard}</p>

      <div>
        <h3>Is this correct?</h3>
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
}
