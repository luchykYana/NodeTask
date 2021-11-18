const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const {config} = require('./configs');
const {ErrorHandler, errors} = require('./errors');
const {userRouter} = require('./routes');

const {MONGO_CONNECT_URL, PORT, NODE_ENV, ALLOWED_ORIGIN} = config;
const {CORS_IS_FORBIDDEN} = errors;

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo is connected');
});

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
})

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(CORS_IS_FORBIDDEN.message, CORS_IS_FORBIDDEN.code), false);
    }

    return callback(null, true);
}
