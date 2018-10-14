const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({ secret: 'this-is-secretive-shhhh' }));
var db

MongoClient.connect('mongodb://bnbuser:makersbnb1@ds255588.mlab.com:55588/makersbnb', {useNewUrlParser: true}, (err, client)  => {

  if (err) return console.log(err)
  db = client.db('makersbnb')
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  const sessionUsername = req.session.username
  db.collection('spaces').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {spaces: result, username: sessionUsername})
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
  res.sendFile(__dirname + '/views/signup.ejs')
})

app.post('/signup', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    req.session.username = req.body.username
    res.redirect('/')
  })
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html')
})

app.post('/login', (req, res) => {
  req.session.username = req.body.username
  res.redirect('/')
})

app.get('/signout', (req, res) => {
  req.session.username = ''
  res.render(__dirname + '/views/logout.ejs')
})
