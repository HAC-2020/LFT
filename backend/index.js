const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app.js`);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB_URI.replace('<PASSWORD>', process.env.DB_PASSWORD);

//MONGOOSE_CONNECT
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to MONGOOSE!`));

//SERVER_LISTEN
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION');
    server.close(() => {
        process.exit(1);
    });
});