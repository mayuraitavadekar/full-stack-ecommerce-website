require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const exitHook = require("exit-hook");

// my Routes
const autRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");

// connecting database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    if (err) throw err;
  });

// application level middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", autRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

// exitHook

// port and listening
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  process.on(
    "exit",
    exitHook(() => {
      console.log("Exiting");
    })
  );
  console.log(`server is running on port ${port}`);
});

/* my notes

1. middle is something in between req and res
2. HTTP req : get, post, put, delete, head
3. HTTP res : these are response codes send to browser
4. now in between req and res, there are lot of middleware functions carried out : 
    - third party middlewares
    - application middlewares
    - error handling middlewares , etc

5. app.use() is method used by app instance of express, to interact/use these middlewares


*/
