const db = require("../models");
const Currency = db.currency;

const addCurrency = function(req, res) {
    console.log(req.body);
    // Destructure the properties from req.body
    const { base, counter, rate } = req.body;
  
    // Validate request
    if (!base || !counter || rate === undefined) {
      res.status(400).send({
        message: "Content cannot be empty and 'base', 'counter', and 'rate' are required!"
      });
      return;
    }
  
    // Create a currency object
    const currency = {
      base,
      counter,
      rate
    };
  
    Currency.create(currency)
    .then(data => {
        // Explicitly highlighting that the response includes the id
        const response = {
        id: data.id,
        base: data.base,
        counter: data.counter,
        rate: data.rate
        };
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while creating the Currency."
        });
    });
  };
  
  
const findAllCurrencies = function(req, res) {
    Currency.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving currencies."
        });
      });
};
  
const updateCurrency = function(req, res) {
    const id = req.params.id;
  
    Currency.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Currency was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Currency with id=${id}. Maybe Currency was not found or req.body is empty!`
          });
        }
    })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Currency with id=" + id
        });
    });
};
  
const deleteCurrency = function(req, res) {
    const id = req.params.id;
  
    Currency.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Currency was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Currency with id=${id}. Maybe Currency was not found!`
          });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: "Could not delete Currency with id=" + id
        });
    });
};

module.exports = {addCurrency, findAllCurrencies, updateCurrency, deleteCurrency}