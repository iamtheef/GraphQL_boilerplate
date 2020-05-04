import "tsconfig-paths/register";
import { Config, MySqlConnectionConfig } from "knex";

const connectionConfig: MySqlConnectionConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: 5432,
};

const config: Config = {
  client: "pg",
  connection: connectionConfig,
  useNullAsDefault: true,
  migrations: {
    directory: "./src/db/migrations",
  },
  seeds: {
    directory: "./src/db/seeds",
  },

  // see the actual SQL queries executed
  debug: false,
};

export default config; // for the app
module.exports = config; // for cli use
