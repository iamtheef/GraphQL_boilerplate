const graphqlFields = require("graphql-fields");

export const isFieldQueried = (info: any, field: string): boolean => {
  const destructuredFields = Object.values(graphqlFields(info));
  const fields: any = [];

  destructuredFields.map((x) => fields.push(Object.keys(x)));
  return fields.flat().includes(field);
};

// fixed queries
// author
export const isAuthorQueried = (info: any): boolean => {
  const destructuredFields = Object.values(graphqlFields(info));
  const fields: any = [];

  destructuredFields.map((x) => fields.push(Object.keys(x)));
  return !!fields.flat().length;
};

// articles
export const isArticleQueried = (info: any): boolean => {
  const destructuredFields = Object.values(graphqlFields(info));
  const fields: any = [];

  destructuredFields.map((x) => fields.push(Object.keys(x)));
  return !!fields.flat().length;
};
