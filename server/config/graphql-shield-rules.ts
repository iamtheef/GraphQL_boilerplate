import { rule, shield, and, or, not } from "graphql-shield";
import { exceedsRateLimit } from "@utils/rateLimiter";
import { rateLimitError, AuthenticatedError } from "@errors/index";

// user must not exceeds rate limit, if so throws error
const notExceedsRateLimit = rule({ cache: "no_cache" })(
  async (_, __, { req }, info) => {
    if (await exceedsRateLimit(req, info)) {
      return rateLimitError;
    }
    return true;
  }
);

// if a user is logged in but requests "login" or "register" an error is thrown
// elsehow if they are not logged in they are authorized to query those fields
const isAuthenticated = rule()(async (_, __, { req }, { fieldName }) => {
  let resp;
  if (fieldName === "register" || fieldName === "login") {
    req.user ? (resp = AuthenticatedError) : (resp = true);
  }

  return resp || !!req.user;
});

const isAdmin = rule()(async (_, __, { req: { user } }) => user.isAdmin);

export const permissions = shield({
  Query: {
    allUsers: and(isAuthenticated, isAdmin),
    findUser: or(isAdmin, isAuthenticated),
    userById: isAdmin,
    me: isAuthenticated,
  },
  Mutation: {
    login: isAuthenticated,
    register: and(notExceedsRateLimit, isAuthenticated),
    updateAcc: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
    deleteAcc: or(isAuthenticated, isAdmin),
    createArticle: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
    editArticle: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
    removeArticle: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
  },
});
