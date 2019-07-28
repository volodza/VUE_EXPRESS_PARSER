const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const keyPhrases = ['мам','доч','сын','малыш'];
vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be')
const db = require('../db')
function requestGroups (Ids,token,i) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            console.log('запрос групп ' + i)
            const code =
               `var user_ids = [${Ids}];
                var i = 0;
                var lists = [];
                var l;
                while (i<10){
                    l = API.groups.get({
                    "user_id": user_ids[i],
                    "count": "1000",
                    "extended" : 1
                    }).items@.name;
                    lists.push([l]);
                    i = i + 1;
                };
                return lists;`;
            vk.setToken(token);
            return vk.api.call('execute', { code })
                         .then(data =>resolve(data.response))
                         .catch(err => console.error(err));
        },i*500);
    });
};

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

function includeKeyPhrases (users){
    return users.filter(user=>{
        return user.groups.some(group=>{
            return keyPhrases.some(keyPhrase =>{
                return group.includes(keyPhrase)
            })
        })
    })
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

module.exports = async (parents) => {
  let allTokens = await db.getDB().collection('users')
                                  .find({})
                                  .map(x => x.token)
                                  .toArray();

  allTokens = allTokens.sort(compareRandom);

  let parentsId = parents.map(x=>x.id)
  console.log(parentsId)
  const promises = [];
  let answer = 'пестой фтыцук';
  for (let i = 0;i*10 <= parentsId.length;i++){
      let ids = parentsId.slice(i*10,(i+1)*10)
      promises.push(requestGroups(ids,allTokens[i%3],i))
  };


    await Promise.all(promises).then(data => {
        console.log(data)
        answer = data.reduce((acc, val) => acc.concat(val), [])
        console.log('Запрос закончен. Найдено' + data.length,data)
      }).catch(err => console.log(err))
      console.log('Запрос групп закончен. Найдено' + answer.length)
      let idsAndGroups = answer.map((x,i)=>{
          return {
              id : parentsId[i],
              groups : x.reduce((acc, val) => acc.concat(val), [])
            }
        });
        return includeKeyPhrases(idsAndGroups).map(x=>x.id)
}