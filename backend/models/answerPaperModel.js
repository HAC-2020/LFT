const mongoose = require('mongoose');

const AnswerPaperSchema = new mongoose.Schema({
    paper_id: String,
    paper_name: {
        type: String,
        required: [true, 'Must Provide Name!']
    },
    last_modified: Date,
    answers: {
        type: Array
    },
    active: {
        type: Boolean,
        default: false
        // select: false
    }
});

QuestionPaper = mongoose.model('QuestionPaper', QuestionPaperSchema);

module.exports = QuestionPaper;