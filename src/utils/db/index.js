const { Level } = require("level");
const path = require("path");
const users = require("./../../data/users.js");

const dbPath = process.env.DB_PATH || path.join(__dirname, "mydb");
const options = {
  keyEncoding: "binary",
  valueEncoding: "json",
};
const db = new Level(dbPath, options);

//populate users db
const batch = [];
users.forEach((user) => {
  batch.push({ type: "put", key: user.username, value: user });
});

db.batch(batch, (err) => {
  if (err) throw err;
  console.log("Users database populated");
});

module.exports = db;
