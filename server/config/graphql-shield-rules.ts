import { rule, shield, and, or, not } from "graphql-shield";
import { exceedsRateLimit as rateLimit } from "@utils/rateLimiter";

const exceedsRateLimit = rule({ cache: "no_cache" })(
  async (_, __, { req }, info) => {
    if (await rateLimit(req, info)) {
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
    // exceedsRateLimit rule is purposely not negated. rule returns either error if limit is exceeded or true to continue
    login: not(isAuthenticated),
    register: and(exceedsRateLimit, not(isAuthenticated)),
    updateAcc: or(isAdmin, and(isAuthenticated, exceedsRateLimit)),
    deleteAcc: or(isAuthenticated, isAdmin), // we check ownership inside the resolver
    createArticle: or(isAdmin, and(isAuthenticated, exceedsRateLimit)),
    editArticle: or(isAdmin, and(isAuthenticated, exceedsRateLimit)),
    removeArticle: or(isAdmin, and(isAuthenticated, exceedsRateLimit)),
  },
});
