const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

const indexRouter = require('./routes/index')
const taskRouter = require('./routes/task')
const exerciseRouter = require('./routes/exercise')
const itemRouter = require('./routes/item')

app.use(cors());
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/', indexRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/exercises', exerciseRouter)
app.use('/api/items', itemRouter)

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;