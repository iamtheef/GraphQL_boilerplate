import passport from "passport";
import { User } from "@models/User";
import { Users } from "@models/index";

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

// "userId" is the serialized value from the "serializeUser" function above
passport.deserializeUser(async (user: User, done) => {
  try {
    const authenticatedUser = await Users.findById(user._id);
    console.log("came here!");
    done(null, authenticatedUser);
  } catch (err) {
    done(err, null);
  }
});
