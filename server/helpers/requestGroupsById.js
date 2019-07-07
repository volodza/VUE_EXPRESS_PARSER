const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const fs = require("fs");
let allTokens = [
    '528c58919903a6bdf9551cb5d3adaee6bb642e9f3d9d4c64016dee1b0450d6a553d09d5749e4e70e1c82e', //мой последний токен
    // '6c81e7bb3e6e04e0a4b06239792514d3df156c74103247ac055c096ff80cc48a598915c85496dae477dbd',
    '1db474706c211e12be1616bab917f589da3e1a9d475ca01d7efbd400225102839575189ad9aa609ac74e9',//андрюша
    '0b7ba32efd493b5f58b48c57c71251f3d0622e954cd718329db8cefd2329f6d5092bd35601a7fc18b39bd',
    'b51c946d9a01f8dc4c215f4409dd71e12be30f22802edb3a583aec3c7fcbd7d65c9748c7e85038c9878f3'
    // '5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be' - токен приложения
  ];
vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be')

function getGroups500(token, group_ids, i) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            vk.setToken(token);
            vk.api.groups.getById({
                group_ids: group_ids,
                fields: 'verified,market,members_count'
            }).then(data => {
                console.log(data)
                resolve(data);
            });
        }, i * 3000);
    });
};

function sortByReqParams(groups, req) {
    let arr = [];
    
    groups.forEach(group => {
        let official = !req.verified || group.verified === 1,
            with_goods = !req.market || group.market.enabled === 1,
            members_range = req.members_from <= group.members_count &&
            req.members_to >= group.members_count;

        if (official && with_goods && members_range) arr.push(group)
    })
    return arr
    // arr = [{id,name,type,members_count,photo_50},...{}]
}
 
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

  function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  };

module.exports = async (group_ids, req) => {
    console.log(group_ids)
    allTokens = allTokens.sort(compareRandom)
    const promises = [];
    let answer = []

    for (let i = 0; i < group_ids.length / 500; i++) {
        let ids =  group_ids.slice(i * 500, (i + 1) * 500);
        promises.push(getGroups500(allTokens[i % 3], ids, i));
    }

    await Promise.all(promises).then(data => answer = flattenDeep(data));

    return sortByReqParams(answer,req)
}