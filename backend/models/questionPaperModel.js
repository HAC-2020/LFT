const mongoose = require('mongoose');

const QuestionPaperSchema = new mongoose.Schema({
    paper_id: String,
    paper_name: {
        type: String,
        required: [true, 'Must Provide Name!']
    },
    last_modified: Date,
    paper_duration: {
        type: Number,
        required: [true, 'Must Provide duration!']
    },
    total_marks: {
        type: Number,
        required: [true, 'Must Provide total marks!']
    },
    total_questions: {
        type: Number,
        required: [true, 'Must Provide total questions!']
    },
    questions: {
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