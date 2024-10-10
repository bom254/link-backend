const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const patientRoutes = require('./routes/patientRoute');

// use the routes

app.use('/patients', patientRoutes);

// starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});