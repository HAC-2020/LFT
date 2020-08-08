const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const generateToken = require('./../utils/tokenGenerator');

const QuestionPaper = require('./../models/questionPaperModel');

exports.getAllPapers = catchAsync(async (req, res) => {
    const papers = await QuestionPaper.find({});
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            papers
        }
    });
});

exports.getOnePaper = catchAsync(async (req, res) => {
    const paper = await QuestionPaper.find({ paper_id: req.params.paper_id });
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            paper
        }
    });
});

exports.createPaper = catchAsync(async (req, res) => {
    const token = generateToken();
    const paper = await QuestionPaper.create({
        paper_id: token,
        paper_name: req.body.paper_name,
        paper_duration: req.body.paper_duration,
        total_marks: req.body.total_marks,
        total_questions: req.body.total_questions,
        last_modified: new Date(Date.now())
    });
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            paper
        }
    });
});

exports.editPaper = catchAsync(async (req, res) => {
    req.body.last_modified = new Date(Date.now());
    await QuestionPaper.findOneAndUpdate({ paper_id: req.params.paper_id }, req.body);
    const paper = await QuestionPaper.find({ paper_id: req.params.paper_id });
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            paper
        }
    });
});


exports.addQuestion = catchAsync(async (req, res) => {
    const paper = await QuestionPaper.find({ paper_id: req.params.paper_id });
    let questions = paper[0].questions;
    questions.push(req.body.newQuestion);
    await QuestionPaper.findOneAndUpdate({ paper_id: req.params.paper_id }, {
        questions,
        last_modified: new Date(Date.now())
    });

    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            paper
        }
    });
});

exports.removeQuestion = catchAsync(async (req, res) => {
    const paper = await QuestionPaper.find({ paper_id: req.params.paper_id });
    let questions = paper[0].questions;
    questions.splice(req.params.question_number, 1);
    await QuestionPaper.findOneAndUpdate({ paper_id: req.params.paper_id }, {
        questions,
        last_modified: new Date(Date.now())
    });

    res.status(204).json({});
});

exports.deletePaper = catchAsync(async (req, res) => {
    const paper = await QuestionPaper.findOneAndDelete({ paper_id: req.params.paper_id });
    res.status(204).json({});
});