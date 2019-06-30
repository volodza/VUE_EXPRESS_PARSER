var config = {};

config.vk = {};
config.mongo = {};

config.hostname = 'rocky-ocean-33328.herokuapp.com';
config.port = process.env.WEB_PORT || 3000;

config.vk.client_id = '7001016';
config.vk.client_secret = 'hQD28VvPlYLgPC4tUbjl';
config.vk.redirect_uri = `http://${config.hostname}/auth/vkontakte/callback`;

config.mongo.url = "mongodb+srv://abc123:Vkfltytwjou9df9@vueexpress-nq8xi.mongodb.net/test?retryWrites=true&w=majority";
config.mongo.name = 'vueExpress';
config.mongo.options = {useNewUrlParser : true};

module.exports = config;