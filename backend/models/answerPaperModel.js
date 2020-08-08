const mongoose = require('mongoose');

const AnswerPaperSchema = new mongoose.Schema({
    paper_id: String,
    paper_name: {
        type: String,
        required: [true, 'Must Provide Name!']
    },
    user_name: String,
    user_email: String,
    last_modified: Date,
    answers: {
        type: Array
    },
    active: {
        type: Boolean,
        default: false
    }
});

AnswerPaper = mongoose.model('AnswerPaper', AnswerPaperSchema);

module.exports = AnswerPaper;