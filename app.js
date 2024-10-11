require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
global.common = require("./common/index");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const customerRouter = require('./routes/customers');
const cardRouter = require('./routes/cards');
const paymentRouter = require('./routes/payments');

const app = express();

const a = ["a","b","c","d"];
for (const key in Object(a)) {
	if (Object.prototype.hasOwnProperty.call(Object(a), key)) {
		console.log("=>>>>>>>>>>.",key)
	}
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customerRouter);
app.use('/users', usersRouter);
app.use('/cards', cardRouter);
app.use('/payments', paymentRouter);

module.exports = app;
