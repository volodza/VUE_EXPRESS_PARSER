const express = require('express');
const db = require('../../db');
const config = require('../../config')

const tasks = express.Router();


tasks.get('/', async (req,res) => {
  console.log(req.query.user_id)
  let tasks = await db.getDB().collection('tasks').findOne({id:req.query.user_id})
  let withoutAnswer = tasks.tasks.map(x=>{
    delete x.answer;
    return x
  })
  res.send(withoutAnswer||[])

});



// auth.get('/checkToken',async (req,res)=>{
//     console.log(req.query)
//     let user = await db.getDB().collection('users').findOne({access_key:req.query.access_key})
//     if(user) res.send(user)
//   })


module.exports = tasks;