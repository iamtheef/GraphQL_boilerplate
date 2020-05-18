import config from "../knexfile";
console.log(config);
const knex = require("knex")(config);

export default knex;
module.exports = knex;
