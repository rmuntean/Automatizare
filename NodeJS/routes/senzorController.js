var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connection ="mongodb://" + process.env.DB_CONNECTION + "/automatizare";

//var senzors=[];

senzorController = {
//    populateSenzors: () => {
//    console.log('START-populateSenzors');
//    senzorController.getSenzors().then(function(result){
//    console.log('COMPLETE-populateSenzors');
//    senzors=result;
//    });
//    },
//    getprepopulatedSenzors: () => {
//       return senzors;
//    },
        getSenzors: (err, callback) => {
            return new Promise(function(resolve,reject) {
            var theDb;
            MongoClient.connectAsync(connection)
                .then(function(db) {
                    theDb = db;
                    return theDb.collection("senzors").find({});
                })
                .then(function (cursor) {
                    return new Promise((resolve, reject) => {
                    cursor.toArray((err, items) => {
                        callback(items);
                        return resolve();
                    });
                    });
                })
                .finally(() => {console.log("DB.Close");theDb.close()})
                .catch((err)=>{
                    console.log(err);
                    err(500);
                });
            });
        },
            getSenzor: (senzor) => {
                return new Promise(function(resolve,reject) {
                    var theDb;
                    return MongoClient.connectAsync(connection)
                        .then(function(db) {
                            theDb = db;
                            return theDb.collection("senzors").findAsync({"mac_id":senzor});
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

//    getSenzors: () => {
//        return new Promise(function(resolve,reject) {
//            var theDb;
//            return MongoClient.connectAsync(connection)
//                .then(function(db) {
//                    theDb = db;
//                    return theDb.collection("senzors").findAsync({});
//                })
//                .then(function (cursor) {
//                    cursor.toArray((err, items) => {
//                        resolve(items);
//                    });
//                })
//                .finally(() => {
//                    theDb.close()
//                })
//                .catch(reject);
//        });
//    },

    addSenzor: (senzor) => {
        return new Promise(function(resolve,reject) {
            var theDb;
            return MongoClient.connectAsync(connection)
                .then( function(db) {
                    theDb = db;
                    return theDb.collection("senzors").saveAsync(senzor);
                })
                .then(resolve)
                .finally(() => {
                    theDb.close()
                })
                .catch(reject);
        });
    }

};

module.exports = senzorController;


