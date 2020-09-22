const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'YOUR_DATABASE_USER_NAME_HERE',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)} );
app.put('/image', (req, res) => { image.handleImage(req, res, db)} );
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} );

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

/*
  / --> res = this is working
  /signin           --> POST = success/fail (we're sending a password)
  /register         --> POST = user object
  /profile/:userId  --> GET = user object
  /image            --> PUT = updated user object
*/