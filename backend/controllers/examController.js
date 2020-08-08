const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const generateToken = require('./../utils/tokenGenerator');

const QuestionPaper = require('./../models/questionPaperModel');
const AnswerPaper = require('./../models/answerPaperModel');

exports.getActiveExams = catchAsync(async (req, res) => {
    const papers = await QuestionPaper.find({ active: true });
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            papers
        }
    });
});

exports.createAnswerPaper = catchAsync(async (req, res) => {
    const paper = await QuestionPaper.find({ paper_id: req.params.paper_id });
    console.log(paper);
    await AnswerPaper.create({
        paper_id: req.params.paper_id,
        paper_name: paper[0].paper_name,
        user_name: req.user.user_name,
        user_email: req.user.user_email,
        last_modifed: new Date(Date.now()),
        active: true
    });

    res.status(200).json({
        status: 'success',
        success: true,
        message: 'Empty Answer Paper Created'
    });
});

exports.activateExam = catchAsync(async (req, res) => {
    const paper = await QuestionPaper.findOneAndUpdate({ paper_id: req.params.paper_id }, { active: true });
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            paper
        }
    });
});

exports.deactivateExam = catchAsync(async (req, res) => {
    const paper = await QuestionPaper.findOneAndUpdate({ paper_id: req.params.paper_id }, { active: false });
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            paper
        }
    });
});

exports.saveAnswer = catchAsync(async (req, res, next) => {
    // CHECK IF QUESTION PAPER IS ACTIVE
    const qp = await QuestionPaper.find({ paper_id: req.params.paper_id });

    // IF NOT ACTIVE, DE-ACTIVATE THE ANSWER PAPER 
    if (qp[0].active === false) {
        await AnswerPaper.findOneAndUpdate({ user_email: req.user.user_email }, { active: false });
        return next(new AppError('The test expired.. Time\'s Up!', 400));
    }

    // IF ACTIVE, UPDATE THE ANSWER AT REQUESTED POSITON
    const ap = await AnswerPaper.find({ user_email: req.user.user_email });

    ap[0].answers[req.params.question_number] = req.body.answer;

    await AnswerPaper.findOneAndUpdate({ user_email: req.user.user_email }, {
        answers: ap[0].answers
    });

    res.status(200).json({
        status: 'success',
        success: true,
        message: 'Your Answer has been uploaded successfully!'
    });
});