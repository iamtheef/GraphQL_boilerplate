import { rule, shield, and, or, not } from "graphql-shield";
import { exceedsRateLimit } from "@utils/rateLimiter";

// user must not exceeds rate limit, if so throws error
const notExceedsRateLimit = rule({ cache: "no_cache" })(
  async (_, __, { req }, info) => {
    if (await exceedsRateLimit(req, info)) {
      return new Error("Rate Limit has been exceeded!");
    }
    return true;
  }
);

const isAuthenticated = rule()(async (_, __, { req }) => !!req.user);

const isAdmin = rule()(async (_, __, { req: { user } }) => user.isAdmin);

export const permissions = shield({
  Query: {
    allUsers: and(isAuthenticated, isAdmin),
    findUser: or(isAdmin, isAuthenticated),
    userById: isAdmin,
    me: isAuthenticated,
  },
  Mutation: {
    login: not(isAuthenticated),
    register: and(notExceedsRateLimit, not(isAuthenticated)),
    updateAcc: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
    deleteAcc: or(isAuthenticated, isAdmin),
    createArticle: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
    editArticle: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
    removeArticle: or(isAdmin, and(isAuthenticated, notExceedsRateLimit)),
  },
});
