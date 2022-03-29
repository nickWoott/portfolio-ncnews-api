const db = require("../db/connection");

exports.selectUsers = async () => {
  const results = await db.query("SELECT * FROM users");
  const usernames = results.rows.map((user) => {
    return { username: user.username };
  });
  return usernames;
};
