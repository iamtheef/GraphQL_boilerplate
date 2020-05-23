export const rateLimitError = Error(
  "Your rate limit has been exceeded! Please try in a few hours."
);

export const AuthenticatedError = Error(
  "You are already authenticated. Logout to use another account."
);

export const unexpectedError = Error("Ooooops! Something was wrong.");

export const productionWarning = Error(
  "This action is not available in production mode. You should try new things on test databases rather than production databases."
);
