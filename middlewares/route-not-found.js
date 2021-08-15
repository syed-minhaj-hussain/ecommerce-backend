const routeNotFound = (req, res) =>
  res.status(404).json({ Message: "Route Not Found!" });

module.exports = { routeNotFound };
