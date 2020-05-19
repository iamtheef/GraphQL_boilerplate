import "tsconfig-paths/register";
import { Config, MySqlConnectionConfig, Sqlite3ConnectionConfig } from "knex";

// let connectionConfig: MySqlConnectionConfig | Sqlite3ConnectionConfig = {};

const config: Config = {
  client: "pg",
  connection: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
  },
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
export default config;
module.exports = config; // for cli use
