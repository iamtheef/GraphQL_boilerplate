const graphqlFields = require("graphql-fields");

export const isFieldQueried = (info: any, field: string): boolean => {
  return !!graphqlFields(info)[`${field}`];
};
