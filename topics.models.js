const res = require("express/lib/response");
const db = require("./db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics").then((results) => {
    console.log(results.rows, "<< model log");
    return results.rows;
  });
};
