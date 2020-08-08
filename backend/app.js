const express = require('express');
const xss = require('xss-clean');
const cookieparser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const questionPaperRouter = require('./routes/questionPaperRouter');
const examRouter = require('./routes/examRouter');

const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json({ limit: '50kb' }));
app.use(xss());
app.use(cookieparser());

// STATIC FILES
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());

// ROUTE MIDDLEWARE
app.use('/api/v1/user', userRouter);
app.use('/api/v1/paper', questionPaperRouter);
app.use('/api/v1/exam', examRouter);

// ROUTE NOT FOUND
app.all('*', (req, res, next) => {
    next(new AppError('PAGE NOT FOUND. 404 is a palindrome in base -31.', 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;