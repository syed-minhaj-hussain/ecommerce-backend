const mongoose = require("mongoose");
const startConnection = () => {
  mongoose
    .connect(process.env.CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log({ err }));
};
module.exports = { startConnection };
