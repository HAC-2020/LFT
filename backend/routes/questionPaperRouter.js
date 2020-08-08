const express = require('express');
const questionPaperController = require('./../controllers/questionPaperController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('admin'));
// FOLLOWING ROUTES ARE RESTRICTED TO ADMIN

router.get('/', questionPaperController.getAllPapers);
router.get('/:paper_id', questionPaperController.getOnePaper);
router.post('/create', questionPaperController.createPaper);
router.patch('/question/add/:paper_id', questionPaperController.addQuestion);
router.patch('/question/remove/:paper_id/:question_number', questionPaperController.removeQuestion);
// router.patch('/purge/:paper_id');
router.patch('/edit/:paper_id', questionPaperController.editPaper);
router.delete('/delete/:paper_id', questionPaperController.deletePaper);

module.exports = router;