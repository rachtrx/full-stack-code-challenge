const { login, verifyToken } = require("../controller/userController.js");
const { addCurrency, findAllCurrencies, updateCurrency, deleteCurrency } = require("../controller/currencyController.js");

module.exports = app => {
  
    const authRouter = require("express").Router();
    authRouter.post("/signin", login);

    const currencyRouter = require("express").Router();
    // Apply the verifyToken middleware to all routes in the currencyRouter
    currencyRouter.use(verifyToken);
  
    currencyRouter.post("/add", addCurrency);
    currencyRouter.get("/", findAllCurrencies);
    currencyRouter.patch("/update/:id", updateCurrency);
    currencyRouter.delete("/delete/:id", deleteCurrency);

    // Mount the routers on the app
    app.use('/api/auth', authRouter);
    app.use('/api/currencies', currencyRouter);
  };