var fs = require("fs");
const { join } = require("path");
const { Database } = require("sqlite3");
// var dbFile = "./sqlite.db";

const dbFile = join(__dirname, ".", "sqlite", "sqlite.db");
var exists = fs.existsSync(dbFile);
var db = new Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function () {
  if (!exists) {
    db.run(
      "CREATE TABLE Matches (context TEXT, data TEXT, socketId TEXT, friendSocketId TEXT)",
      console.log
    );
    // insert default matches
    // db.serialize(function () {
    //db.run('INSERT INTO Matches (context, data) VALUES ("123", "{\'lives\': 3}")', console.log);
    //});
  }
});

module.exports = function (app) {
  app.db = db;
};
