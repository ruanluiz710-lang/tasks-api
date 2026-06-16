const { initDb } = require('../db/init');

let dbInstance;
function getDbInstance() {
  if (!dbInstance) dbInstance = initDb();
  return dbInstance;
}

function toIsoNow() {
  return new Date().toISOString();
}

function listTasks() {
  const db = getDbInstance();

  return new Promise((resolve, reject) => {
    db.all(
      'SELECT id, title, description, completed, created_at, updated_at FROM tasks ORDER BY id DESC',
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          completed: r.completed === 1,
          created_at: r.created_at,
          updated_at: r.updated_at
        })));
      }
    );
  });
}

function getTaskById(id) {
  const db = getDbInstance();

  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, title, description, completed, created_at, updated_at FROM tasks WHERE id = ?',
      [id],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);

        resolve({
          id: row.id,
          title: row.title,
          description: row.description,
          completed: row.completed === 1,
          created_at: row.created_at,
          updated_at: row.updated_at
        });
      }
    );
  });
}

function createTask({ title, description, completed }) {
  const db = getDbInstance();
  const now = toIsoNow();

  return new Promise((resolve, reject) => {
    const completedInt = completed ? 1 : 0;

    db.run(
      `INSERT INTO tasks (title, description, completed, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description || null, completedInt, now, now],
      function (err) {
        if (err) return reject(err);
        resolve({
          id: this.lastID,
          title,
          description: description || null,
          completed: completedInt === 1,
          created_at: now,
          updated_at: now
        });
      }
    );
  });
}

function updateTask(id, { title, description, completed }) {
  const db = getDbInstance();
  const now = toIsoNow();

  return new Promise((resolve, reject) => {
    const completedInt = completed ? 1 : 0;

    db.run(
      `UPDATE tasks
       SET title = ?,
           description = ?,
           completed = ?,
           updated_at = ?
       WHERE id = ?`,
      [title, description || null, completedInt, now, id],
      function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return resolve(null);

        resolve({
          id,
          title,
          description: description || null,
          completed: completedInt === 1,
          created_at: null,
          updated_at: now
        });
      }
    );
  });
}

function deleteTask(id) {
  const db = getDbInstance();

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
}

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

