const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const requestGroupsById = require('./requestGroupsById')
const db = require('../db')

vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be')

function requestGroups(q, req, token, i) {
    return new Promise((resolve, _) => {
        const { type, city_id, sort, market } = req;
        setTimeout(() => {
            vk.setToken(token);
            vk.api.groups.search({
                q: q,
                type: (type === 'future' ? 'event' : type),
                city_id: city_id,
                future: (type == 'future' ? 1 : 0),
                market: market,
                sort: sort,
                count: 1000
            }).then(data => {
                console.log(i)
                resolve(data.items);
            });
        }, i * 3000);
    });
};

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

            await db.getDB().collection('tasks').updateOne({ id: req.user_id, 'tasks.begin': new Date(startDate) }, {
                $set: {
                    [`tasks.$.answer`]: objIds
                }
            })
        }
    })
}

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

module.exports = async(req) => {

    let startDate = new Date();

    await db.getDB().collection('tasks').updateOne({ id: req.user_id }, {
        $push: {
            tasks: {
                title: req.title,
                status: 'loading',
                begin: startDate,
                params: req
            }
        }
    }, { upsert: true });

    let allTokens = await db.getDB().collection('users')
        .find({})
        .map(x => x.token)
        .toArray()
    allTokens = allTokens.sort(compareRandom)

    // let p = Promise.resolve();

    // for (const [i, q] of req.q.entries()) {
    //   p = p.then(requestGroups(q,req,allTokens[i%3],i));
    // }

    const promises = [];
    let answer = []

    req.q.forEach((q, i) => promises.push(requestGroups(q, req, allTokens[i % 3], i)))

    await Promise.all(promises).then(data => answer = flattenDeep(data));
    answer = answer.map(x => x.id)
    let groups = await requestGroupsById(answer, req);
    // groups = [{id,name,type,members_count,photo_50},...{}]

    await dividedBy10k(groups, req, startDate);

    await db.getDB().collection('tasks').updateOne({ id: req.user_id, 'tasks.begin': startDate }, {
        $set: {
            'tasks.$.end': new Date,
            'tasks.$.status': 'complete',
            // 'tasks.$.answer':groupsIds,
            'tasks.$.count': groups.length,
            'tasks.$.type': 'groups'
        }
    })


    // console.log(groupsIds)
}