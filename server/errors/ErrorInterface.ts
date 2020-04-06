export interface Error {
  path: string;
  message: string;
}

export const throwNewError = (errors: [Error]) => {
  return {
    success: false,
    errors,
  };
};
