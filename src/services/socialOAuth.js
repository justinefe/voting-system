import passport from 'passport';
import FacebookPassport from 'passport-facebook';
import GooglePassport from 'passport-google-oauth20';

import { config } from 'dotenv';

config();

const FacebookStrategy = FacebookPassport.Strategy;
const GoogleStrategy = GooglePassport.Strategy;

/**
 * 
 * @description A function to obtain user prifile
 * 
 * @param {*} profile 
 */

const userProfile = profile => {
  const {
    // eslint-disable-next-line camelcase
    id, provider, photos, emails, displayName: username,
    givenName: first_name, familyName: last_name
  } = profile;
  let imageUrl = '';
  let email = '';
  if (emails && emails.length) {
    email = emails[0].value;
  }
  if (photos && photos.length) {
    imageUrl = photos[0].value;
  }
  return {
    social_id: id,
    username,
    first_name,
    last_name,
    image: imageUrl,
    email,
    provider
  };
};
/**
 * @description Facebook login 
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  scope: ['email', 'public_profile'],
  enableProof: true,
  passReqToCallback: true,
},
(req, accessToken, refreshToken, profile, done) => done(null, userProfile(profile))));

/**
 * Google login
 */
passport.use(new GoogleStrategy({
  consumerKey: process.env.GOOGLE_CONSUMER_KEY,
  consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email', 'openid'],
  enableProof: true,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, cb) => cb(null, userProfile(profile))));

/**
 * Twitter oauth login
 */
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
  scope: ['profile', 'email', 'openid'],
  enableProof: true,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, cb) => cb(null, userProfile(profile))));
