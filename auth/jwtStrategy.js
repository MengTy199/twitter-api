const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;
const { userModel } = require("../models/user.js");

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
// opts.issuer = ""
// opts.audiance = ""

const jwtStrategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  const user = await userModel.findById(jwt_payload.id);
  if (!user) {
    done(null, false);
  } else {
    done(null, user);
  }
});

module.exports = { jwtStrategy };
