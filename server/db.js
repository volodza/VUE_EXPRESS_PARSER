const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('./config')


const state = {
    db:null
}

const connect = (cb) => {
    if (state.db) {
        cb()
    } else {
        MongoClient.connect(config.mongo.url,config.mongo.options,(err,client)=>{
            if (err) {
                cb(err)
            }
            else {
                state.db = client.db(config.mongo.name)
                cb()
            }
        })
    }
};

const getPrimaryKey = (_id) => {
    return ObjectID(_id)
};

const getDB = () => {
    return state.db
};

module.exports = {getDB,connect,getPrimaryKey}