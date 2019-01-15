const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const exercisesRouter = require('./routes/exercise');
const taskRouter = require('./routes/task');
const typeRouter = require('./routes/type');

const app = express();

app.use(cors());
app.use(bodyParser());

app.use('/api/', indexRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/types', typeRouter);

app.use(function (req, res, next) {
  next(createError(404));
});


module.exports = app;