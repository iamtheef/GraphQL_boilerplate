import { User } from "@models/User";
import knex from "@config/knex";
import passport from "passport";

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// "userId" is the serialized value from the "serializeUser" function above
passport.deserializeUser(async (userID: Number, done) => {
  try {
    const authenticatedUser = await knex("users")
      .where("id", userID)
      .first();

    done(null, authenticatedUser);
  } catch (err) {
    done(err, null);
  }
});
