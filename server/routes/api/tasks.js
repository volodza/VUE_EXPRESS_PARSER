const express = require('express');
const db = require('../../db');
const config = require('../../config')

const tasks = express.Router();

delete
tasks.get('/', async(req, res) => {
    // console.log(req.query.user_id)
    let tasks = await db.getDB().collection('tasks').findOne({ id: +req.query.user_id })
    let withoutAnswer = tasks.tasks.map(x => {
            delete x.answer;
            return x
        })
        // console.log(withoutAnswer.length)
    res.send(withoutAnswer || [])

});

tasks.get('/delete', async(req, res) => {
    console.log(req.query)
    await db.getDB().collection('tasks').updateOne({ id: +req.query.user_id }, {
        $pull: {
            tasks: {
                begin: new Date(req.query.begin)
            }
        }
    })
    res.send('Задача успешно удалена')

});

tasks.post('/downloadAnswer', async function(req, res) {
    // console.log(req.body)
    // const adapter = new FileSync('tasks/' + req.body.user_id +'.json')
    // const userTasks = low(adapter)
    // let task = userTasks.get('tasks')
    //          .find({begin:req.body.begin})
    //          .value()
    let user = await db.getDB().collection('tasks').findOne({ id: req.body.user_id }),
        task = user.tasks.find(x => x.begin.toString() == new Date(req.body.begin).toString())


    let text_ready = task.answer.map(x => 'http://vk.com/public' + x).join `\r\n` || ''
    console.log(task)
    res.contentType('text/plain')
        .send(`data:application/force-download,${new Buffer.from(text_ready)}`);
});



// auth.get('/checkToken',async (req,res)=>{
//     console.log(req.query)
//     let user = await db.getDB().collection('users').findOne({access_key:req.query.access_key})
//     if(user) res.send(user)
//   })


module.exports = tasks;