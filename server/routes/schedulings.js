const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Scheduling = require('../models/Scheduling');

// BUSCAR a lista completa dos agendamentos
router.get('/schedulings', (req, res, next) => {
  Scheduling.find()
    .then((allTheSchedulings) => {
      res.json(allTheSchedulings);
    })
    .catch((err) => {
      res.json(err);
    });
});

// BUSCAR um agendamento específico
router.get('/scheduling/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Scheduling.findById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// EDITAR um agendamento específico
router.put('/scheduling/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Scheduling.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

// DELETAR um agendamento de consulta
router.delete('/scheduling/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Scheduling.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

// CRIAR um novo agendamento de consulta
router.post('/scheduling/new', (req, res, next) => {
  const {
    reason, date, hour, id_patient, id_doctor
  } = req.body;
  Scheduling.create({
    reason,
    date,
    hour,
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
