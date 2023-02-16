import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  path: process.env.SQL_DB_PATH || "library.db",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log(
      "Postgress SQL Reader Connection has been established successfully."
    );

    // eslint-disable-next-line no-use-before-define
    await runAllMigrations();

    await createSeedUsers();

    return sequelize;
  } catch (err) {
    logError("Unable to connect to the database:", err);
    throw err;
  }
}

export async function disconnectFromDB() {
  await sequelize.close();
  logVerbose("Disconnected from database");
}

export async function runAllMigrations() {
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
  logVerbose("All migrations performed successfully");
  await seeder.up();
  logVerbose("All seeders performed successfully");
}

/**
 * To be used during tests.
 */
export async function dropAllTables() {
  await sequelize.getQueryInterface().dropAllTables();
  logVerbose("Dropped all tables from database...");
}
