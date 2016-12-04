var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;
var ObjectID = require('mongodb').ObjectID

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connection ="mongodb://" + process.env.DB_CONNECTION + "/automatizare";

temperatureController = {
    getTemperature: (filter) => {
        return new Promise(function(resolve,reject) {
        var theDb;
        MongoClient.connectAsync(connection)
            .then(function(db) {
                theDb = db;
                return theDb.collection("a8fe34de7370").find({"_id": {"$gte": ObjectID(filter.gte),"$lte": ObjectID(filter.lte)}});
            })
            .then(function (cursor) {
                return new Promise((resolve1, reject) => {
                cursor.toArray((err, items) => {
                    console.log(items);
                    resolve(items);
                    return resolve1();
                });
                });
            })
            .finally(() => {console.log("DB.Close");theDb.close()})
            .catch((err)=>{
                console.log(err);
            });
        });
    },

    getUser: (user) => {
        return new Promise(function(resolve,reject) {
            var theDb;
            return MongoClient.connectAsync(connection)
                .then(function(db) {
                    theDb = db;
                    return theDb.collection("user").findAsync({"username":user});
                })
                .then(function (cursor) {
                    cursor.toArray((err, items) => {
                        resolve(items);
                    });
                })
                .finally(() => {
                    theDb.close()
                })
                .catch(reject);
        });
    },

    saveTemperature: (temperature,mac_id) => {
        return new Promise(function(resolve,reject) {
            var theDb;
            return MongoClient.connectAsync(connection)
                .then( function(db) {
                    theDb = db;
                    return theDb.collection(mac_id).insertAsync(temperature);
                })
                .then(resolve)
                .finally(() => {
                    theDb.close()
                })
                .catch(reject);
        });
    }

};

module.exports = temperatureController;


