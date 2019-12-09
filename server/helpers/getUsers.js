const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const db = require('../db')

function mixReqParams(req) {
    let paramsForReq = [];

    for (let i = 0; i < req.q.length; i++) {
        for (let j = req.ageFrom; j <= req.ageTo; j++) {
            paramsForReq.push({
                age_from: j,
                age_to: j,
                q: req.q[i]
            });
        };
    };

    if (req.sex === 0) {
        paramsForReq = paramsForReq.map(x => {
                return {...x, sex: 1 }
            })
            .concat(paramsForReq.map(x => {
                return {...x, sex: 2 }
            }))
    } else {
        paramsForReq = paramsForReq.map(x => {
            return {...x, sex: req.sex }
        })
    }

    return paramsForReq
}

function requestUsers(params, req, token, i) {
    return new Promise((resolve, _) => {
        const { q, sex, age_from, age_to } = params;
        setTimeout(() => {
            vk.setToken(token);
            vk.api.users.search({
                q: q,
                sex: sex,
                age_from: age_from,
                age_to: age_to,
                sort: 0,
                count: 1000,
                fields: 'photo_50,sex,bdate,city,country',
                lang: 'ru'
            }).then(data => {
                console.log(data)
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
    allTokens = allTokens.sort(compareRandom);

    const promises = [];
    let users = []
    let reqParams = mixReqParams(req)
    console.log(req)
    reqParams.forEach((params, i) => promises.push(requestUsers(params, req, allTokens[i % allTokens.length], i)))

    await Promise.all(promises).then(data => users = flattenDeep(data));

    await dividedBy10k(users, req, startDate);

    await db.getDB().collection('tasks').updateOne({ id: req.user_id, 'tasks.begin': startDate }, {
        $set: {
            'tasks.$.end': new Date,
            'tasks.$.status': 'complete',
            'tasks.$.count': users.length,
            'tasks.$.type': 'users'
        }
    })


}