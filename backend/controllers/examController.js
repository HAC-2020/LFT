const catchAsync = require('./../utils/catchAsync');
const generateToken = require('./../utils/tokenGenerator');

const QuestionPaper = require('./../models/questionPaperModel');

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
    const papers = await QuestionPaper.find({ active: true });
    res.status(200).json({
        status: 'success',
        success: true,
        data: {
            papers
        }
    });
});