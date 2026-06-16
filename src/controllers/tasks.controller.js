const {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../repositories/tasks.repository');

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function validateCreateBody(body) {
  if (!body || typeof body !== 'object') {
    return 'Body inválido.';
  }

  if (!body.title || typeof body.title !== 'string') {
    return 'Campo "title" é obrigatório e deve ser string.';
  }

  const description = body.description;
  if (description != null && typeof description !== 'string') {
    return 'Campo "description" deve ser string ou null.';
  }

  const completed = body.completed;
  if (completed != null && typeof completed !== 'boolean') {
    return 'Campo "completed" deve ser boolean.';
  }

  return null;
}

function validateUpdateBody(body) {
  // Mesmas regras do create (para simplificar no portfólio)
  return validateCreateBody(body);
}

async function listTasksHandler(req, res) {
  const tasks = await listTasks();
  res.json({ tasks });
}

async function getTaskByIdHandler(req, res) {
  const id = parseId(req);
  if (!id) return res.status(400).json({ error: { message: 'Id inválido.' } });

  const task = await getTaskById(id);
  if (!task) return res.status(404).json({ error: { message: 'Task não encontrada.' } });

  res.json({ task });
}

async function createTaskHandler(req, res) {
  const validationError = validateCreateBody(req.body);
  if (validationError) {
    return res.status(400).json({ error: { message: validationError } });
  }

  const task = await createTask({
    title: req.body.title.trim(),
    description: req.body.description ?? null,
    completed: req.body.completed ?? false
  });

  res.status(201).json({ task });
}

async function updateTaskHandler(req, res) {
  const id = parseId(req);
  if (!id) return res.status(400).json({ error: { message: 'Id inválido.' } });

  const validationError = validateUpdateBody(req.body);
  if (validationError) {
    return res.status(400).json({ error: { message: validationError } });
  }

  const updated = await updateTask(id, {
    title: req.body.title.trim(),
    description: req.body.description ?? null,
    completed: req.body.completed ?? false
  });

  if (!updated) return res.status(404).json({ error: { message: 'Task não encontrada.' } });

  // Para manter resposta completa (created_at), fazemos leitura rápida
  const task = await getTaskById(id);
  res.json({ task: task || updated });
}

async function deleteTaskHandler(req, res) {
  const id = parseId(req);
  if (!id) return res.status(400).json({ error: { message: 'Id inválido.' } });

  const ok = await deleteTask(id);
  if (!ok) return res.status(404).json({ error: { message: 'Task não encontrada.' } });

  res.status(204).send();
}

module.exports = {
  listTasks: listTasksHandler,
  getTaskById: getTaskByIdHandler,
  createTask: createTaskHandler,
  updateTask: updateTaskHandler,
  deleteTask: deleteTaskHandler
};

