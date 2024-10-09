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

        bcrypt.hash(password, 10, (err, hash) => {
            if(err) throw err;

            db.query(
                'INSERT INTO patients (first_name, last_name, email, password, phone, date_of_birth, gender, address) VALUES(?,?,?,?,?,?,?,?)',
                [first_name, last_name, email, hash, phone, date_of_birth, gender, address],
                (err, result) => {
                    if (err) throw err;
                    res.status(201).json({msg:'Patient registration is a success'})
                }
            )
        });
    }]);
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // finding if our user exists in the system
    db.query('SELECT * FROM patients WHERE email = ?', [email], (err, result) => {
        if(err) throw err;
        if(result === 0){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const patient = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(!isMatch){
                return res.status(400).json({msg: 'Invalid credentials'});
            }

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                expiresIn: '1h',
            })

            res.json({token, msg: 'Login was usccessfull.'});
        });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);
})