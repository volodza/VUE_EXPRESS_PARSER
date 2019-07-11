const express = require('express');
const VK = require('vk-io'); //Версия 3.2
const vk = new VK();

vk.setToken('3efb55543efb55543efb5554423e9186ec33efb3efb55546216d5563cc9af82fd0568cc');
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
  console.log(req.query)
  vk.api.database.getCountries({
    need_all:0,
    v: '5.101',
    lang:'ru'
  }).then(data=>{
    console.log(data)
    res.send(data)
  })
});

module.exports = geolocation;