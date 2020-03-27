export interface Error {
  path: string;
  message: string;
}

export interface ErrorResponse {
  token?: string;
  success: boolean;
  errors: Errors;
}




export interface Errors extends Array<Error> {}
