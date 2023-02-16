const {
  connectToDB,
  disconnectFromDB,
  dropAllTables,
} = require("../../database");

async function startDBServer() {
  try {
    process.env.SQL_DB_PATH = "test.db";
    await connectToDB();
  } catch (err) {
    console.error(err);
  }
}

async function stopDBServer() {
  try {
    // await dropAllTables();
    // await disconnectFromDB();
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resove) => setTimeout(resove, 1000));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  startDBServer,
  stopDBServer,
};
