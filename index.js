require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if(err){
        console.error('Database connection failed.', err);
        return;
    }

    console.log('Connected to the database');
});

app.post('/signup', (req, res) => {
    const {first_name, last_name, email, password, phone, date_of_birth, gender, address} = req.body;

    db.query('SELECT * FROM patients WHERE email = ?', [email,(err, results) => {
        if(err) throw err;
        if(results.length > 0){
            return res.status(400).json({msg: 'User already exists.'})
        }
    }])
})