const express = require("express");
const { router: productsRouter } = require("./routes/products.router");
const { startConnection } = require("./db.connect");
const app = express();

startConnection();
app.use("/products", productsRouter);
app.get("/", (req, res) =>
  res.json({
    success: true,
    message: "we are on home",
    env: process.env.CONNECTION_URI,
  })
);

app.listen(5000, () => console.log("server started"));
