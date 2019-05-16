const express = require('express');

const router = express.Router();

const photo = require('../models/photo-model');

// is require the consultation id to find the photo
router.get('/consultation/photo', (req, res, next) => { 
  photo.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(err => next(err));
});

router.post('/consultation/upload', (req, res, next) => {
  photo.create(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(err => next(err));
});

module.exports = router;
