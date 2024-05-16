const { userModel } = require("../models/user.js");
const jwt = require("jsonwebtoken");

const checkIfEmailExist = async (email) => {
  const user = await userModel.findOne({ email: email });
  if (!user) return false;
  return true;
};

const signToken = (id, email, username) => {
  const token = jwt.sign(
    {
      id: id,
      email: email,
      username: username,
    },
    process.env.SECRET,
    {
      expiresIn: '24h',
      issuer: "api.mt.com",
      audience: "www.mt.com",
    }
  );
  return token;
};
// const signToken = (payload) => {
//   const token = jwt.sign({
//       id: payload.id,
//       email: payload.email,
//       username: payload.username
//   }, process.env.JWT_KEY, {
//       expiresIn: '7h',
//       issuer: 'api.tfdevs.com',
//       audience: 'www.tfdevs.com'
//   })
//   return token
// }

module.exports = { checkIfEmailExist, signToken };
