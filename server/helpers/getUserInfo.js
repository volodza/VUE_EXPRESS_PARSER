const VK = require('vk-io'); //Версия 3.2
const vk = new VK();

module.exports = async (id,token) => {
    console.log('запрос юзерИнфо' + id + token)
    let userInfo = 'До запроса вк';
    vk.setToken(token);
    userInfo = await vk.api.users.get({
                    user_ids: id,
                    fields:'photo_50'
                }).then(data => data[0]);
    return userInfo;
}