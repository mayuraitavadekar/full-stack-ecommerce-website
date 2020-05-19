const stripe = require("stripe")("sk_test_lMkihrW9puAJ1A2dDINmjBM100rJFR5SMn");
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
  console.log("make payment is called.");
  const { products, token } = req.body;
  console.log("PRODUCTS ", products);

  let amount = 0;
  products.map((item, index) => {
    amount = amount + item.price;
  });

  const idempotencyKey = uuid();

  // chaining in stripe -> 1. create customer 2. charge a customer 3. return a response
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
              // can add more properties
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          console.log("ERROR IN STRIPE -> ", error);
        });
    });
};
