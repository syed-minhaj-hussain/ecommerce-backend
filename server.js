const express = require("express");
const cors = require("cors");
const { startConnection } = require("./db.connect");
require("dotenv").config();

const { router: productsRouter } = require("./routes/products.router");
const { router: signInRouter } = require("./routes/login.router");
const { router: signUpRouter } = require("./routes/register.router");
const { router: cartRouter } = require("./routes/cart.router");
const { routeNotFound } = require("./middlewares/route-not-found");
const { errorHandler } = require("./middlewares/error-handler");

const app = express();
const PORT = 5000;

startConnection();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/login", signInRouter);
app.use("/register", signUpRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => res.json("Hello World"));

/**
 * Do not move : (404 Route-Not-Found) Handler.
 */
app.use(routeNotFound);
/**
 * Error-Handler Middleware.
 */
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started at PORT : ${PORT}`));
