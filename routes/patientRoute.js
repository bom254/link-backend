const express = require('express');
const router = express.Router();
const { registerPatient, getPatients, loginPatient} = require('../controllers/patientContoller');

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.post('/', getPatients);

module.exports = router;