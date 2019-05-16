const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Doctor = require('../models/Doctor');

// BUSCAR a lista completa de médicos
router.get('/doctors', (req, res, next) => {
  Doctor.find()
    .then((allTheDoctors) => {
      res.json(allTheDoctors);
    })
    .catch((err) => {
      res.json(err);
    });
});

// BUSCAR um médico específico
router.get('/doctor/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Doctor.findById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// EDITAR um médico específico
router.put('/doctor/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Doctor.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

// CRIAR um novo médico no banco
router.post('/doctor/new', (req, res, next) => {
  const {
    username, password, name, crm, specialty, email, birthdate, telResidencial, cellphone,
  } = req.body;
  Doctor.create({
    username,
    password,
    name,
    crm,
    specialty,
    email,
    birthdate,
    telResidencial,
    cellphone,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;
