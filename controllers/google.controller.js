import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

import GoogleAccountCollection from "../models/google.schema.js";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await GoogleAccountCollection.findOne({ id: profile.id });
        if (user) {
          cb(null, user);
        } else {
          const newUser = new GoogleAccountCollection({
            displayName: profile.displayName,
            id: profile.id,
            imageUrl: profile.picture,
          });
          await newUser.save();
          cb(null, newUser);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await GoogleAccountCollection.findOne({ id: id });
  done(null, user);
});
