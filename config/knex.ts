import config from "../knexfile";

const knex = require("knex")(config);
console.log(config);

export default knex;
