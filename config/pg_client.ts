import { db_opts } from "@config/server-config";

const { Client } = require("pg");

export const client = new Client(db_opts);
