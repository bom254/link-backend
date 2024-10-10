const { addPatient, getAllPatients, findPatientByEmail } = require('../models/patients')
const bcrpyt = require('bcrypt');

const registerPatient = async(req,res) => {
    try{
        const patient = await addPatient(req.body);
        res.status(201).json({ msg: 'Patient is registered on the system', patient});
    } catch(err){
        res.status(500).json({msg: 'Patient not registered', error: err.msg});
    }
};

const getPatients = async (req,res) => {
    try{
        const patients = await getAllPatients();
        res.status(200).json(patients)
    } catch (err){
        res.status(500).json({msg: ' Error trying to find the patient'});
    }
};

const loginPatient = async (req,res) => {
    const {email, password} = req.body;

    try{
        const patient = await findPatientByEmail(email);

        if(!patient){
            return res.status(401).json({msg: 'Email or Password is incorrect'});
        }

        // Compare the provided password
        const match = await bcrpyt.compare(password, patient.password_hash);
        if(!match){
            return res.status(401).json({msg: 'Email or Password is incorrect'});

        }
        res.status(200).json({msg: 'Login Successfull', patient});
    } catch(err){
        res.status(500).json({msg: ' Error loggin in', error: err.msg});
    }
};

module.exports = { registerPatient, getPatients, loginPatient};