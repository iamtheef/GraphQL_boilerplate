export interface Error {
  path: string;
  messages: string[];
}

export const throwNewError = (errors: string[]) => {
  return {
    success: false,
    errors,
  };
};
