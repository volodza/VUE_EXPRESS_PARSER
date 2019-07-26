const VK = require('vk-io'); //Версия 3.2
const vk = new VK();
const searchParents = require('./parsed/additional/searchParents.js');
const checkThematicGroups = require('./parsed/additional/checkThematicGroups.js');
const checkChildAge = require('./parsed/additional/checkChildAge.js');
vk.setToken('5fc38e0a5fc38e0a5fc38e0a125fa4650455fc35fc38e0a038255abdc43193b05fba5be')

function parentsIds (parents,childrens) {
    let arr = [];
    parents.forEach(x=>x.relatives.forEach(y=>{
        if (childrens.includes(y.id)) arr.push(x.id)
    }))
    return arr;
}

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  };

module.exports = async (req, res) => {
    let parents = await searchParents(req);
    let parentsWithThematicGroups = await checkThematicGroups(parents);//определить родителей исходя из групп в которых состоит
    let parentsOfChildrenWithPage = await checkChildAge(parents,req);

    console.log(parentsWithThematicGroups.concat(parentsOfChildrenWithPage))

}