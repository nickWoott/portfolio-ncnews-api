const db = require('../db/connection');

exports.selectTopics = async () => {
  try {
    const results = await db.query('SELECT * FROM topics');
    return results.rows;
  } catch (err) {
    console.error('Error executing query:', err.stack);
    throw err;
  }
};
