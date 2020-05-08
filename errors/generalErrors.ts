export const rateLimitError = Error(
  "Your rate limit has been exceeded! Please try in a few hours."
);

export const AuthenticatedError = Error(
  "You are already authenticated. Logout to use another account."
);

export const unexpectedError = Error("Ooooops! Something was wrong.");
