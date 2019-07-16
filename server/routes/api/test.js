const express = require('express');
const db = require('../../db');
const config = require('../../config')

const test = express.Router();

const VK = require('vk-io'); //Версия 3.2
const vk = new VK();

module.exports = async (id,token) => {
    console.log('запрос юзерИнфо' + id + token)
    let userInfo = 'До запроса вк';
    vk.setToken(token);
    userInfo = await vk.api.users.get({
                    user_ids: id,
                    fields:'photo_50'
                }).then(data => data[0]);
    return userInfo;
}

test.get('/user',async (req,res) => {
  let id = req.query.id;

  let allTokens = await db.getDB().collection('users')
                                  .find({})
                                  .map(x => x.token)
                                  .toArray()

  vk.setToken(allTokens[0]);

  let userInfo = await vk.api.users.get({
      user_ids: id,
      fields:'photo_100,status,counters,contacts,relation,can_send_friend_request,can_write_private_message,can_post,last_seen,online,occupation'
  }).then(data => data[0]);

  console.log(userInfo)
  res.send(userInfo)
})

test.get('/', async (req,res) => {
  //{page,user_id,begin}
  let page = +req.query.page;
      console.log(req.query)
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