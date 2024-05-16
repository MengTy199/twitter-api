const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  issuer: 'api.mt.com',
  audience: 'www.mt.com'
};
const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  done(null, jwt_payload)
});

module.exports = { jwtStrategy };
