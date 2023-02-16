const { connectToDB } = require("../../database");

async function startDBServer() {
  try {
    process.env.SQL_DB_NAME = `memory-${new Date().getTime()}`;
    process.env.SQL_Db_PATH = "test.db";
    await connectToDB();
    deleteFilesInDirectory(UPLOADS_DIR);
  } catch (err) {
    console.error(err);
  }
}

async function stopDBServer() {
  try {
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
