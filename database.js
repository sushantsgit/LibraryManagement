const { Umzug, SequelizeStorage } = require("umzug");
const { Sequelize } = require("sequelize");

const storage = process.env.SQL_DB_PATH || "test.db";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log(
      "Postgress SQL Reader Connection has been established successfully."
    );

    // eslint-disable-next-line no-use-before-define
    await runAllMigrations();
    return sequelize;
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    throw err;
  }
}

async function disconnectFromDB() {
  await sequelize.close();
  console.log("Disconnected from database");
}

async function runAllMigrations() {
  const migrator = new Umzug({
    migrations: {
      glob: ["migrations/*.js", { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
      sequelize,
    }),
    logger: console,
  });

  const seeder = new Umzug({
    migrations: {
      glob: ["seeders/*.js", { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
      sequelize,
    }),
    logger: console,
  });
  // checks migrations and run them if they are not already applied
  await migrator.up();
  console.log("All migrations performed successfully");
  await seeder.up();
  console.log("All seeders performed successfully");
}

/**
 * To be used during tests.
 */
async function dropAllTables() {
  await sequelize.getQueryInterface().dropAllTables();
  console.log("Dropped all tables from database...");
}

module.exports = {
  connectToDB,
  disconnectFromDB,
  dropAllTables,
  sequelize,
};
