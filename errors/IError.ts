export interface Error {
  messages: string[];
}

export const throwNewError = (errors: string[]) => {
  return {
    success: false,
    errors,
  };
};
