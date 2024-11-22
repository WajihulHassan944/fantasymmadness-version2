import React, { useState, useEffect } from "react";
import "./thankyou-purchase-tokens.css";

const ThankyouPurchaseTokens = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the component after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    // Clear the timer if the component unmounts before 4 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null; // Do not render anything if `isVisible` is false
  }

  return (
    <div className="thankyou-purchase-tokens-parent">
      <div className="thankyou-purchase-tokens-child">
        <h1>Thank you for your purchase!</h1>
        <h2>Tokens are successfully added to your fight wallet.</h2>
      </div>
    </div>
  );
};

export default ThankyouPurchaseTokens;
