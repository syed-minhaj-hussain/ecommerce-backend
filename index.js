const express = require("express");
// const bodyParser = require("body-parser");
const { router: productsRouter } = require("./routes/products.router");
const { startConnection } = require("./db.connect");
const app = express();

startConnection();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/products", productsRouter);
app.get("/", (req, res) =>
  res.json({
    success: true,
    message: "we are on home",
  })
);

app.listen(5000, () => console.log("server started"));
