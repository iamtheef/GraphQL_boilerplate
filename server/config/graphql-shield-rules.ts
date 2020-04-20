import { rule, shield, and, or } from "graphql-shield";

const isAuthenticated = rule({ cache: "contextual" })(
  async (_, __, { req }) => {
    return req.user !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (_, __, { req: { user } }) => {
    return user.isAdmin;
  }
);

const isOwner = rule({ cache: "contextual" })(
  async (_, __, { req: { user } }) => {
    return user.items.some((id: any) => id === _.id);
  }
);

export const permissions = shield({
  Query: {
    allUsers: and(isAuthenticated, isAdmin),
    findUser: or(isAdmin, isAuthenticated),
    userById: isAdmin,
    me: isAuthenticated,
  },
  Mutation: {
    updateAcc: or(isAuthenticated, isAdmin),
    deleteAcc: or(isAuthenticated, isAdmin),
    createArticle: or(isAuthenticated, isAdmin),
    editArticle: or(isAdmin, and(isAuthenticated, isOwner)),
    removeArticle: or(isAdmin, and(isAuthenticated, isOwner)),
  },
});
