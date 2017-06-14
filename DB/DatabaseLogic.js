/**
 * Created by asgerarnbjornthyregod on 24/05/2017.
 */
/**
 * Created by asgerarnbjornthyregod on 19/04/2017.
 */
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

function DatabaseLogic (){

}

DatabaseLogic.prototype.createConnection = function (cb) {
    MongoClient.connect('mongodb://Testing:abc123@adnudging.com:27017/AdNudgingDB?authSource=admin', function(err, db){
        assert.equal(err, null);
        cb(db);
    });
};

DatabaseLogic.prototype.updateLocation = function (rfidId, roomId, cb) {
    this.createConnection(function (db) {
        db.collection('RFIDScanners').find({"roomId": parseInt(roomId)}).toArray(function(err, docs){
            newRoom = docs[0].roomName;
            db.collection('RFIDTags');
            timestamp = new Date();
            db.collection('RFIDTags').updateOne({"rfidTag": rfidId}, {$set: {"roomName": newRoom}, $push: {historicalLocation: {"timestamp": timestamp, "roomName": newRoom}}});
            answer ="Yes, yes";
            cb(answer);
            db.close();
        });
    });
};

DatabaseLogic.prototype.getAllLocations = function (cb) {
  this.createConnection(function (db) {
      db.collection('RFIDTags').find({}).toArray(function (err, docs) {
          data_Array = [[],[],[]];
          for(rfids in docs){
              doc = docs[rfids];
              if(doc.type == "doctor"){
                  data_Array[0].push(doc);
              } else if (doc.type == "patient") {
                  data_Array[1].push(doc)
              } else if (doc.type == "equipment"){
                  data_Array[2].push(doc);
              }
          }
          cb(data_Array);
      })
  })
};

module.exports = DatabaseLogic;
//logic = new DatabaseLogic();
