const express = require('express');
const VK = require('vk-io'); //Версия 3.2
const vk = new VK();

vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be');
const geolocation = express.Router();


geolocation.get('/cities', (req,res) => {
  vk.api.database.getCities({
    country_id:req.query.country_id,
    q:req.query.q
  }).then(data=>{
    res.send(data)
  })
});

geolocation.get('/countries', (req,res) => {
  vk.api.database.getCountries({
    need_all: 1,
    count:1000
  }).then(data=>{
    res.send(data)
  })
});

module.exports = geolocation;