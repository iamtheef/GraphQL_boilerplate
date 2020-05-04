import { User } from "@models/User";
import { Users } from "@models/index";
import passport from "passport";

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// "userId" is the serialized value from the "serializeUser" function above
passport.deserializeUser(async (userID: String, done) => {
  try {
    const authenticatedUser = await Users.findById(userID);
    done(null, authenticatedUser);
  } catch (err) {
    done(err, null);
  }
});
