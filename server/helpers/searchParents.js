const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const db = require('../db')
vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be')

function mixReqParams (req) {
    let data = [];
    const ageRage = (req) => {
        let ages = [];
        for (let i = req.parentAgeFrom; i <= req.parentAgeTo; i += 2) {
            ages.push({
                parent_age_from: i,
                parent_age_to: i + 1
            });
        };
        return ages;
    };

    if (req.sex === 1 || req.sex === 0) ageRage(req).forEach(age=>data.push({...age,sex:1}));
    if (req.sex === 2 || req.sex === 0) ageRage(req).forEach(age=>data.push({...age,sex:2}));

    return data;
};

function requestParents (data,token,i,j,req) {
    return new Promise((resolve, _) => {
        const {parent_age_from,parent_age_to,sex} = data;
        setTimeout(() => {
            console.log(data)
            vk.setToken(token);
            vk.api.users.search({
                sex: sex,
                count: 1000,
                fields: "relatives,photo_50,bdate,city,country",
                lang:'ru',
                age_to: parent_age_to,
                age_from: parent_age_from,
                city: req.city,
                status: req.status,
                has_photo: req.hasPhoto
            }).then(data => {
                console.log('Готово ' + i + ' из ' + j, data);
                resolve(data.items);
              }).catch(err => console.log(err));
        },i*3000);
    });
};

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

module.exports = async (req) => {

  console.log('1')
  let allTokens = await db.getDB().collection('users')
                                  .find({})
                                  .map(x => x.token)
                                  .toArray();

  allTokens = allTokens.sort(compareRandom);


    let reqParams = mixReqParams(req.body);
    console.log(req.body)
    const promises = [];
    let parents = [];
    reqParams.forEach((x, i) => promises.push(requestParents(x,allTokens[i % 3], i, reqParams.length, req.body)));

    await Promise.all(promises).then(data => {
        console.log(data)
        parents = flattenDeep(data)
        // console.log('Запрос закончен. Найдено' + data.length,data)
      }).catch(err => console.log(err))

      console.log('Запрос закончен. Найдено' + parents.length)
      return parents;
}