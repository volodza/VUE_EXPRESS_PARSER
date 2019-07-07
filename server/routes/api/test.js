const express = require('express');
const db = require('../../db');
const config = require('../../config')

const test = express.Router();


test.get('/', async (req,res) => {
  //{page,user_id,begin}
  let page = +req.query.page;

  let tasks = await db.getDB().collection('tasks').findOne({id:+req.query.user_id});
      console.log(tasks)
      task = tasks.tasks.find(x=>x.begin.toString() == new Date(req.query.begin).toString());
      console.log(task)
      objIds = task.answer;
      console.log(objIds)
  //objIds = ['45ef2f','32rsd3ed']

  let promises = [];
  objIds.forEach(objId=>{
    promises.push(db.getDB().collection('ids').findOne(db.getPrimaryKey(objId)))
  })

  await Promise.all(promises).then(data =>{
    console.log(data[0].groups)
    res.send({
      pages:Math.ceil(data[0].groups.length/100),
      arr:data[0].groups.slice((page-1)*100,page*100)
    })
  })

});



module.exports = test;