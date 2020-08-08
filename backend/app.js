const express = require('express');
const xss = require('xss-clean');
const cookieparser = require('cookie-parser');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const questionPaperRouter = require('./routes/questionPaperRouter');

const app = express();

// GLOBAL MIDDLEWARE
app.use(express.json({ limit: '50kb' }));
app.use(xss());
app.use(cookieparser());

// STATIC FILES
app.use(express.static(`${__dirname}/public`));

// ROUTE MIDDLEWARE
app.use('/api/v1/user', userRouter);
app.use('/api/v1/paper', questionPaperRouter);

// ROUTE NOT FOUND
app.all('*', (req, res, next) => {
    next(new AppError('404 is a palindrome in base -31. PAGE NOT FOUND.', 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;