var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connection ="mongodb://" + process.env.DB_CONNECTION + "/automatizare";

temperatureController = {
    getTemperature: (err, callback) => {
        var theDb;
        MongoClient.connectAsync(connection)
            .then(function(db) {
                theDb = db;
                return theDb.collection("temperature").findAsync({});
            })
            .then(function (cursor) {
                cursor.toArray((err, items) => {
                    callback(items);
                });
            })
            .finally(() => {theDb.close()})
            .catch((err)=>{
                console.log(err);
                err(500);
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


