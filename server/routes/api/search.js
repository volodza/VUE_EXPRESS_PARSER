const express = require('express');
const db = require('../../db');
const config = require('../../config')
const getGroups = require('../../helpers/getGroups')
const getUsers = require('../../helpers/getUsers')

const search = express.Router();


search.post('/groups', (req,res) => {
  // console.log(req.body)
  getGroups(req.body)
  res.send('Запрос успешно начался')
});

search.post('/users', (req,res) => {
  // console.log(req.body)
  getUsers(req.body)
  res.send('Запрос успешно начался')
});



// auth.get('/checkToken',async (req,res)=>{
//     console.log(req.query)
//     let user = await db.getDB().collection('users').findOne({access_key:req.query.access_key})
//     if(user) res.send(user)
//   })


module.exports = search;