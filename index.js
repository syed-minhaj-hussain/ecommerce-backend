const express = require("express");
const cors = require("cors");
const { startConnection } = require("./db.connect");
const { router: productsRouter } = require("./routes/products.router");
const { errorHandler, routeNotFoundHandler } = require("./middlewares");
const app = express();

startConnection();
app.use(cors());
app.use(express.json());
app.use("/products", productsRouter);
app.get("/", (req, res) =>
  res.json({
    success: true,
    message: "we are on home",
  })
);

/**
 * Do Not Remove: (404 ROUTE HANDLER)
 */
app.use(routeNotFoundHandler);
app.use(errorHandler);
app.listen(5000, () => console.log("server started"));
