const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const db = require('../db')

vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be')

function onlyId(groups) {
  return groups.map(x => x.id)
}


function getBirthdays(token, data, i, j, req) {
  return new Promise((resolve, _) => {
    const { sex, age_from, age_to, birth_day, birth_month } = data;
    const code =
      `var i = 0;
     var arr = [];
    while (i < 25){
      var u = API.users.search({  
        "sex": ${sex},
        "age_from": ${age_from} + i,
        "age_to": ${age_to},
        "birth_day": ${birth_day},
        "birth_month": ${birth_month},
        "fields": "bdate",
        "city": ${req.city},
        "count":1000
      }).items;
      arr.push(u);
      i = i + 1;
    };
     return arr;`

    setTimeout(() => {
      vk.setToken(token);

      vk.api.users.search({
        sex: sex,
        count: 1000,
        fields: "photo_50,sex,bdate,city,country",
        lang:'ru',
        birth_day: birth_day,
        birth_month: birth_month,
        age_to: age_to,
        age_from: age_from,
        city: req.city
      }).then(data => {
        console.log('Готово ' + i + ' из ' + j, data)
        resolve(data.items)
      })
    }, i * 3000)
  })
}

function mixData(req) {
  let bdays = (req) => {
    let monthFrom = +req.bdayFrom.split`-`[1],
      monthTo = +req.bdayTo.split`-`[1],
      dayFrom = +req.bdayFrom.split`-`[2],
      dayTo = +req.bdayTo.split`-`[2],
      j = dayFrom,
      birthDays = [];
    for (let i = monthFrom; i <= monthTo; i++) {
      while (!(i === monthTo && j - 1 === dayTo) && j <= 31) {
        birthDays.push({
          birth_month: i,
          birth_day: j
        });
        j++;
      }
      j = 1;
    }
    return birthDays;
  };


  let ageRage = (req) => {
    let ages = []
    for (let i = req.ageFrom; i <= req.ageTo; i += 2) {
      ages.push({
        age_from: i,
        age_to: i + 1
      })
    }
    return ages;
  }

  let mix = (req) => {
    let arr = [],
      days = bdays(req),
      ages = ageRage(req);
    if (req.sex === 1 || req.sex === 0) days.forEach(day => ages.forEach(age => arr.push({ ...day, ...age, sex: 1 })));
    if (req.sex === 2 || req.sex === 0) days.forEach(day => ages.forEach(age => arr.push({ ...day, ...age, sex: 2 })));

    return arr
  }

  return mix(req)
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


function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function flattenDeep(arr1) {
  return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

module.exports = async (req, res) => {
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
                                  .toArray();

  allTokens = allTokens.sort(compareRandom);

  const promises = [];
  let users = [];

  let mix = mixData(req)
  mix.forEach((x, i) => promises.push(getBirthdays(allTokens[i % 3], x, i, mix.length, req)));

  await Promise.all(promises).then(data => {
    users = flattenDeep(data)
  }).catch(err => res.send(err))

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