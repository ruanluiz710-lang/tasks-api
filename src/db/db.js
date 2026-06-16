const sqlite3 = require('sqlite3').verbose();

const path = require('path');

const SQLITE_PATH = process.env.SQLITE_PATH || './data/tasks.db';

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath);
  const fs = require('fs');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getDb() {
  const dbPath = path.isAbsolute(SQLITE_PATH)
    ? SQLITE_PATH
    : path.join(process.cwd(), SQLITE_PATH);

  ensureDirForFile(dbPath);

  const db = new sqlite3.Database(dbPath);
  return db;
}


module.exports = { getDb };

