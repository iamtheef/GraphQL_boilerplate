import config from "../knexfile";

const knex = require("knex")(config);

export default knex;
