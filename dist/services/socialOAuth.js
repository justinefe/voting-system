"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth20"));

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var FacebookStrategy = _passportFacebook["default"].Strategy;
var GoogleStrategy = _passportGoogleOauth["default"].Strategy;
/**
 * 
 * @description A function to obtain user prifile
 * 
 * @param {*} profile 
 */

var userProfile = function userProfile(profile) {
  var id = profile.id,
      provider = profile.provider,
      photos = profile.photos,
      emails = profile.emails,
      username = profile.displayName,
      first_name = profile.givenName,
      last_name = profile.familyName;
  var imageUrl = '';
  var email = '';

  if (emails && emails.length) {
    email = emails[0].value;
  }

  if (photos && photos.length) {
    imageUrl = photos[0].value;
  }

  return {
    social_id: id,
    username: username,
    first_name: first_name,
    last_name: last_name,
    image: imageUrl,
    email: email,
    provider: provider
  };
};
/**
 * @description Facebook login 
 */


_passport["default"].use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  scope: ['email', 'public_profile'],
  enableProof: true,
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  return done(null, userProfile(profile));
}));
/**
 * Google login
 */


_passport["default"].use(new GoogleStrategy({
  consumerKey: process.env.GOOGLE_CONSUMER_KEY,
  consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email', 'openid'],
  enableProof: true,
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, cb) {
  return cb(null, userProfile(profile));
}));
/**
 * Twitter oauth login
 */


_passport["default"].use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
  scope: ['profile', 'email', 'openid'],
  enableProof: true,
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, cb) {
  return cb(null, userProfile(profile));
}));