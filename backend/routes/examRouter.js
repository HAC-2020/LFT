const express = require('express');
const authController = require('./../controllers/authController');
const examController = require('./../controllers/examController');

const router = express.Router();

router.use(authController.protect);

router.get('/', examController.getActiveExams);
router.get('/start/:paper_id', examController.createAnswerPaper);
router.patch('/activate/:paper_id');

module.exports = router;