const express = require('express');

const { tasksRouter } = require('./tasks.routes');

const routes = express.Router();

routes.use('/tasks', tasksRouter);

module.exports = { routes };

