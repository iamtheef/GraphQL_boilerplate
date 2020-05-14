import { User } from "@models/User";
import knex from "@config/knex";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";

type obj = { user: User; salt: string };

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// "userID" is the serialized value from the "serializeUser" function above
passport.deserializeUser(async (userID, done) => {
  try {
    const authenticatedUser = (await knex("users").where("id", userID))[0];

    done(null, authenticatedUser);
  } catch (err) {
    done(err, null);
  }
});
