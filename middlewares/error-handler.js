const errorHandler = (err, req, res, next) => {
  console.log({ error: err });
  res
    .status(500)
    .json({ success: false, message: "Somehing Went Wrong!", error: err });
};

module.exports = { errorHandler };
