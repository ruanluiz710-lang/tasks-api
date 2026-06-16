const express = require('express');

const {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks.controller');

const tasksRouter = express.Router();

tasksRouter.get('/', listTasks);
tasksRouter.get('/:id', getTaskById);
tasksRouter.post('/', createTask);


tasksRouter.put('/:id', updateTask);
tasksRouter.delete('/:id', deleteTask);

module.exports = { tasksRouter };

