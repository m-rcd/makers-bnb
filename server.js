const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
var db

MongoClient.connect('mongodb://bnbuser:makersbnb1@ds255588.mlab.com:55588/makersbnb', (err, client) => {
  if (err) return console.log(err)
  db = client.db('makersbnb')
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('spaces').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {spaces: result})
  })
})

app.get('/space', (req, res) => {
  res.sendFile(__dirname + '/space.html')
})

app.post('/space', (req, res) => {
  db.collection('spaces').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/signup', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
