const router = require('express').Router(),
      mongoose = require('mongoose'),
      security = require('../util/security'),
      programController = require('../controllers/trainingProgramController');


router.get('/:programId', programController.getProgramById);

router.get('/', programController.findPrograms)

module.exports = {
    router
}



