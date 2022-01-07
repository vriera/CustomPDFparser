const {MongoClient} = require('mongodb');
const {MONGO_DB_DATABASE , MONGO_DB_IP} = process.env;
const MONGO_DB_URL =`mongodb://${MONGO_DB_IP}/${MONGO_DB_DATABASE}`;
const clientMongo = new MongoClient(MONGO_DB_URL);
let db;
let collection;

async function initMongo(){
    await clientMongo.connect();
    db = await clientMongo.db('patentes');
    collection = await db.collection('unfiltred');
    return collection;
}

async function insertArray(array){
    db.collection("unfiltred").insertMany(array , function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      });
}
async function closeMongo(){
    await db.close();
}

module.exports = { initMongo , insertArray , closeMongo   } ;