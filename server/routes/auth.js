const express = require('express');
const request = require('request');
const db = require('../db');
const config = require('../config')
const getUserInfo = require('../helpers/getUserInfo')

const auth = express.Router();


auth.get('/vkontakte', async (req,res) => {
    let access_key = genKey ();
    let obj = {
      vk_url:"https://oauth.vk.com/authorize?" + 
      "client_id=" + config.vk.client_id +
      "&display=page" +
      "&redirect_uri=" + config.vk.redirect_uri +
      "&scope=wall,groups,photos,video,market,email,offline" +
      "&response_type=code&v=5.95"+
      "&state=" + access_key,
      access_key
    }

    res.send(obj)
});

auth.get('/vkontakte/callback',(req,res)=> {
    console.log(req.query.state)
    let access_key = req.query.state;
    request({
      method: 'GET',
      url: 'https://oauth.vk.com/access_token',
      qs: {
          client_id : config.vk.client_id,
          client_secret : config.vk.client_secret,
          redirect_uri : config.vk.redirect_uri,
          code : req.query.code,
          json : true
        }
    },async (error, response, body) => {
      console.log(JSON.parse(body))
        token = JSON.parse(body)['access_token'];
        user_id = JSON.parse(body)['user_id']
        userInfo = await getUserInfo(user_id,token)

        let alreadyUser = await db.getDB().collection('users').findOne({id:userInfo.id})
  
        if (alreadyUser){
          db.getDB().collection('users').updateOne(
            {id:user_id},
            {$set : 
              {
                token,
                access_key,
                ...userInfo
              }
            }
          )
        } 
        else {
          db.getDB().collection('users').insertOne({
            id:user_id,
            token,
            access_key,
            ...userInfo
          })    
        }
  
        res.redirect(`http://${config.hostname}`)
    })
});

auth.get('/checkToken',async (req,res)=>{
    console.log(req.query)
    let user = await db.getDB().collection('users').findOne({access_key:req.query.access_key})
    if(user) res.send(user)
  })

function genKey (){
    let str = 'ABCDEFG123HIJKLMNOP4567QRSTUVW890XYZ'
    let key = ''
    while (key.length<64){
      key+=str[Math.floor(Math.random() * str.length)];
    }
    return key;
}

module.exports = auth;