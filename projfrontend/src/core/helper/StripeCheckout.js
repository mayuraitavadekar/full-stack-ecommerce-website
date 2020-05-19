import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "./CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../../backend";
import createOrder from "./OrderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((item, index) => {
      amount = amount + item.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    // token will be generated with help of this stripeKey
    // now before writing code here, you will need to do some config in backend
    // after writing stripeRoutes, makePayment Controller in backned. Let's code here
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayement`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        // after getting response, call further methods
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => {
        console.log("ERROR IN FRONT END STRIPE -> " + error);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_W7xIBlDZ5DXV8CJgrPhV75c600VGqZQhI9"
        token={makePayment}
        amount={getFinalPrice() * 100} // this only show amount in front-end portal
        name="Buy Tshirt"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay With Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign In</button>
      </Link>
    );
  };

  // main component
  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
