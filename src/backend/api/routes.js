const express = require("express");
const baseURL = "https://api.binance.com";
const binanceRoutes = express.Router();
const axios = require("axios");

binanceRoutes.route("/getpairs").get(function(req, res) {
  var data;
  axios.get(`${baseURL}/api/v3/ticker/price`).then(result => {
    data = result.data.filter(item => {
      if (item.symbol.includes("BTC", 3)) return item;
    });
    res.set({
      "Access-Control-Allow-Origin": "*"
    });
    res.send(data);
  });
});

module.exports = binanceRoutes;
