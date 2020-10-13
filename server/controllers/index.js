const indexRouter = require("express").Router();

indexRouter.get("/", (req, res) => {
  res.render('index.html');
});

module.exports = indexRouter;
