const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "govsecai.db");
const db = new Database(dbPath, { readonly: false });

// Enable WAL mode for better concurrent read performance
db.pragma("journal_mode = WAL");

module.exports = db;
