const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const db = require('../db')
// const keyPhrases = ['мам','доч','сын','малыш'];
vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be')

function requestChildren (childIds,token,i) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            vk.setToken(token);
            vk.api.users.get({
                user_ids:childIds,
                fields:"bdate"
            }).then(data => {
                resolve(data);
              });
        },i*3000);
    });
};

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

function compareRandom(a, b) {
  return Math.random() - 0.5;
}
 

function getChildIds (data) {
    let arr = [];
    data.forEach(x=>{
       return x.relatives.forEach(y=>{
            if(y.type === 'child' && y.id > 0 ) arr.push(y.id)
        })
    })
    console.log(arr)
    return arr;
};

function sortByBdate (childrens,req){
    let ageFrom = req.body.childAgeFrom,
        ageTo = req.body.childAgeTo,
        currentDate = new Date();

    childrens = childrens.filter(child=>/\d+.\d+.\d+/.test(child.bdate));

    return childrens.filter(x=>{
        let bdate = new Date (x.bdate.split`.`.reverse().join`-`),
            diff = currentDate - bdate,
            fullYears = Math.floor(diff/31557600000);
        return (fullYears >= ageFrom && fullYears <= ageTo)
    }).map(child => child.id)
}

function parentsIds (parents,childrens) {
    let arr = [];
    parents.forEach(x=>x.relatives.forEach(y=>{
        if (childrens.includes(y.id)) arr.push(x)
    }))
    return arr;
}

module.exports = async (parents,req) => {
  let allTokens = await db.getDB().collection('users')
  .find({})
  .map(x => x.token)
  .toArray();

  allTokens = allTokens.sort(compareRandom);

    const onlyWithRelativesTypeChild = parents.filter(x=>{
        return typeof x.relatives !== "undefined" && 
               x.relatives.some(y=>y.type === 'child')
     });
    const childIds = getChildIds(onlyWithRelativesTypeChild);
    const promises = [];

    for (let i = 0;i*1000 <= childIds.length;i++){
        let ids = childIds.slice(i*1000,(i+1)*1000)
        promises.push(requestChildren(ids,allTokens[i%3],i))
    };

    let answer;

    await Promise.all(promises).then(data => {
        data = flattenDeep(data)
        console.log(data)
        answer = data
        console.log('Запрос детей закончен. Найдено' + data.length,data)
      }).catch(err => console.log(err))
      console.log('sortByBdate')
      let sortedChildrenIds = sortByBdate(answer,req)
      return parentsIds(onlyWithRelativesTypeChild,sortedChildrenIds)
    //   return onlyWithRelativesTypeChild.filter(x=>x.relatives.some(y=>sortedChildrenIds.includes(y.id))).map(x=>x.id);
}