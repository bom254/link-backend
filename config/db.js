// importing dependancies
const { Pool } = require('pg');
require('dotenv').config();

// getting the environment variables
const pool = new Pool ({
    user: process.env.DB_USER,
    hsot: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});

module.exports = pool;
