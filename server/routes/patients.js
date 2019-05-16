const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const PatientRecord = require('../models/PatientRecord');

// BUSCAR a lista completa de pacientes
router.get('/patients', (req, res, next) => {
  PatientRecord.find().populate('Pacientes')
    .then((allThePatients) => {
      res.json(allThePatients);
    })
    .catch((err) => {
      res.json(err);
    });
});

// BUSCAR um paciente específico
router.get('/patient/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  PatientRecord.findById(req.params.id).populate('tasks')
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// EDITAR um paciente específico
router.put('/patient/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  PatientRecord.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

// CRIAR um novo paciente no banco
router.post('/patient/new', (req, res, next) => {
  const {
    name, gender, birthdate, address, maritalStatus, affiliation, telResidential, cellphone, healthInsurance, email, bloodType, familyHistory, surgicalHistory, allergies, id_patient, id_doctor
  } = req.body;
  PatientRecord.create({
    name,
    gender,
    birthdate,
    address,
    maritalStatus,
    affiliation,
    telResidential,
    cellphone,
    healthInsurance,
    email,
    bloodType,
    familyHistory,
    surgicalHistory,
    allergies,
    id_patient,
    id_doctor,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;
