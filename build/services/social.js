"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth20"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var GoogleStrategy = _passportGoogleOauth["default"].Strategy;
var FacebookStrategy = _passportFacebook["default"].Strategy;

var userProfile = function userProfile(profile) {
  var id = profile.id,
      provider = profile.provider,
      photos = profile.photos,
      emails = profile.emails,
      displayName = profile.displayName;
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
    name: displayName,
    image: imageUrl,
    email: email,
    provider: provider
  };
}; // Configure the Google strategy for use by Passport.js


_passport["default"].use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email', 'openid'],
  enableProof: true,
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, cb) {
  return cb(null, userProfile(profile));
})); // Configure the Facebook strategy for use by Passport.js


_passport["default"].use('facebook', new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  scope: ['email', 'public_profile'],
  enableProof: true,
  passReqToCallback: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (req, accessToken, refreshToken, profile, cb) {
  return cb(null, userProfile(profile));
}));