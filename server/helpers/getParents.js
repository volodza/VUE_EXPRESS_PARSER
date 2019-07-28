const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const searchParents = require('./searchParents.js');
const checkThematicGroups = require('./checkThematicGroups.js');
const checkChildAge = require('./checkChildAge.js');
const db = require('../db')


function parentsIds (parents,childrens) {
    let arr = [];
    let result;
    parents.forEach(x=>x.relatives.forEach(y=>{
        if (childrens.includes(y.id)) arr.push(x.id)
    }))
    return arr;
}

async function dividedBy10k(groups, req, startDate) {
    let arr = [];
    let objIds = []
  
    for (let i = 0; i * 10000 <= groups.length; i++) {
        arr.push({
            groups: groups.slice(i * 10000, (i + 1) * 10000)
        })
    }
  
    await db.getDB().collection('ids').insertMany(arr, async(err, result) => {
        if (err)
            console.log(err)
        else {
            console.log(result.insertedIds)
            let insertedIds = result.insertedIds
            for (let id in insertedIds) {
                objIds.push(insertedIds[id])
            }
  
            await db.getDB().collection('tasks').updateOne({ id: req.user_id, 'tasks.begin': new Date(startDate) }, { $set: {
                    [`tasks.$.answer`]: objIds } })
        }
    })
  }

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  };

module.exports = async (req, res) => {
    let startDate = new Date();

    await db.getDB().collection('tasks').updateOne({ id: req.body.user_id }, {
        $push: {
            tasks: {
                title: req.body.title,
                status: 'loading',
                begin: startDate,
                params: req.body
            }
        }
    }, { upsert: true });

    let parents = await searchParents(req);
    console.log(parents)
    let parentsWithThematicGroups = await checkThematicGroups(parents);//определить родителей исходя из групп в которых состоит
    let parentsOfChildrenWithPage = await checkChildAge(parents,req);

    // console.log(parentsWithThematicGroups.concat(parentsOfChildrenWithPage))
    result = parentsWithThematicGroups.concat(parentsOfChildrenWithPage)
    let filteredParents = parents.filter(x=>result.includes(x.id))
    console.log(filteredParents)
    await dividedBy10k(filteredParents, req.body, startDate);

    await db.getDB().collection('tasks').updateOne({ id: req.body.user_id, 'tasks.begin': startDate }, {
      $set: {
          'tasks.$.end': new Date,
          'tasks.$.status': 'complete',
          'tasks.$.count': result.length,
          'tasks.$.type': 'users'
      }
  })

}