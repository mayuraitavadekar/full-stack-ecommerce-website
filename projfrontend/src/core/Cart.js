import React, { useState, useEffect } from "react";
import "../styles.css";
import {} from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./helper/StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart()); // loadCart() returns json array
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckOut = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  // main cart component
  return (
    <Base title="Cart Page" description="ready to checkout!">
      <div className="row">
        <div className="col-6 text-center">{loadAllProducts()}</div>
        <div className="col-6 text-center">
          <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;

// copied emtire home in the first place and then removed unwanted things
// then added methods loadAllProducts and loadAllCheckout
// then after that, added route /cart in routes.js
