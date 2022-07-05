const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./Controller/register');
const signin = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');

const db = knex({
    client: 'pg',
    connection: {
      host: 'ec2-44-205-41-76.compute-1.amazonaws.com',
      user: 'jrbjzwfsgryyjn',
      password: '23cb44099e01220426ce0a685cf39a842ae37c4333e0b6975dfb6cb455d302b8',
      database: 'd743ij4vdlk1c8'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(db.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on http://localhost:${process.env.PORT}`) })