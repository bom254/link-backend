const pool = require('../config/db')
const bcrpyt = require('bcrypt')

// addition of a new patient in the system
const addPatient = async (patientData) => {
    const {first_name, last_name, email, password_hash, phone, date_of_birth, gender, address} = patientData;

    // setting up the password information in the system
    const hashedPassword = await bcrpyt.hash(password_hash,10);

    // filling patient's data to the system
    const query = `INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const values = [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address];

    const result = await pool.query(query, values);

    return result.rows[0];

    }
    // getting the patient in the system
    const getAllPatients = async () => {
    const result = await pool.query('SELECT * FROM patients');
    return result.rows;
}

// Find patients using email
const findPatientByEmail = async (email) => {
    const query = 'SELECT * FROM patinets email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
}

module.export = {addPatient, getAllPatients, findPatientByEmail}