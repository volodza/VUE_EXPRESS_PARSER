const express = require('express');
const mongodb = require('mongodb');
const request = require('request');

const auth = express.Router();

const vkConfig = {
    client_id:'7001016',
    client_secret:'hQD28VvPlYLgPC4tUbjl',
    redirect_uri:'http://localhost:3000/auth/vkontakte/callback'
};

auth.get('/vkontakte', async (req,res) => {
    let access_key = genKey ();
    let obj = {
      vk_url:"https://oauth.vk.com/authorize?" + 
      "client_id=" + vkConfig.client_id +
      "&display=page" +
      "&redirect_uri=" + vkConfig.redirect_uri +
      "&scope=wall,groups,photos,video,market,email,offline" +
      "&response_type=code&v=5.95"+
      "&state=" + access_key
    }
    res.setHeader('Set-Cookie',`access_key=${access_key}`)
    res.send(obj)
});

auth.get('/vkontakte/callback',(req,res)=> {
    // console.log(req.query.state)
    let access_key = req.query.state;
    request({
      method: 'GET',
      url: 'https://oauth.vk.com/access_token',
      qs: {
          client_id : vkConfig.client_id,
          client_secret : vkConfig.client_secret,
          redirect_uri : vkConfig.redirect_uri,
          code : req.query.code,
          json : true
        }
    },async (error, response, body) => {
      console.log(JSON.parse(body))
        token = JSON.parse(body)['access_token'];
        user_id = JSON.parse(body)['user_id']
        userInfo = await getUserInfo(user_id,token)
        // console.log(userInfo.id)
        let alreadyUser = await db2.getDB().collection('users').findOne({id:userInfo.id})
  
        if (alreadyUser){
          db2.getDB().collection('users').updateOne(
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
          db2.getDB().collection('users').insertOne({
            id:user_id,
            token,
            access_key,
            ...userInfo
          })    
        }
  
        res.redirect('http://localhost:3000/')
    })
});
  

async function getPosts () {
    const uri = "mongodb+srv://abc123:Vkfltytwjou9df9@vueexpress-nq8xi.mongodb.net/test?retryWrites=true&w=majority";
    const client = await mongodb.MongoClient.connect(uri,{ useNewUrlParser: true })
    return client.db("vueExpress").collection("posts");
}

function genKey (){
    let str = 'ABCDEFG123HIJKLMNOP4567QRSTUVW890XYZ'
    let key = ''
    while (key.length<64){
      key+=str[Math.floor(Math.random() * str.length)];
    }
    return key;
}

module.exports = auth;