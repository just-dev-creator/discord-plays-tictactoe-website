const express = require('express')
const discord_o2 = require('discord-oauth2')
const {MongoClient} = require('mongodb')
const discord_user = require('./discord_user.js')
const favicon = require('serve-favicon')
const path = require('path')
// Method summary: connect, getDttDB, getDttCollection, getStats
// const {connect, getDttDB, getDttCollection, getStats} = require('./mongodb.js')


const uri = process.env.MONGODB_CONNECTION_STRING
const client = new MongoClient(uri, { useUnifiedTopology: true })

async function getStats(userid) {
  try {
    await client.connect()
    const database = client.db('discordplaysttt')
    const collection = database.collection('userstats')
    const query = {
      userid: userid
    }
    const found = await collection.findOne(query)
    return found
  } finally {
    await client.close()
  }
}

const app = express()
app.set('view engine', 'ejs')
app.use(favicon(path.join(__dirname,'views','favicon.ico')));
app.use(express.static('views/public'));
app.get('/', (req, res) => {
  res.render('login')
})


app.get('/login', async (req, res) => {
  if (req.query.code == null) {
    res.redirect('/')
  }
  console.log(req.query.code)
  user = await discord_user(req.query.code)
  res.render("index", {
    imageurl: "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png",
    user: user,
    username: user.username,
    discriminator: user.discriminator,
    stats: await getStats(user.id)
  })
})

app.listen(2021, async () => {
  console.log("Online!")
})