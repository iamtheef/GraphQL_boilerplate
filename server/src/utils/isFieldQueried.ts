const graphqlFields = require("graphql-fields");

export const isFieldQueried = (info: any, field: string): boolean => {
  const destructuredFields = Object.values(graphqlFields(info));
  const fields: any = [];

  destructuredFields.map((x) => fields.push(Object.keys(x)));
  return fields[1].includes(field);
};
