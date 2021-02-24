const {MongoClient} = require('mongodb')
async function connect(uri) {
  client = new MongoClient(uri)
  await client.connect()
  return client
}

function getDttDB(client) {
  return client.db('discordplaysttt')
}

function getDttCollection(db) {
  return db.collection('userstats')
}

async function getStats(collection, userid) {
  const query = {
    userid:  userid
  }
  const found = await collection.findOne(query)
  return found
}

exports.connect = connect;
exports.getDttDB = getDttDB;
exports.getDttCollection = getDttCollection;
exports.getStats = getStats

// Method summary: connect, getDttDB, getDttCollection, getStats