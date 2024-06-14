const { GraphQLError } = require("graphql");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.SECRET;
const expiration = "2hr"

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.virtual('token').get(function() {
  return jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: '2h'});
})

module.exports =  {
  AuthenticationError: new GraphQLError('Could Not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    // Token sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Splits token string into an array and returns actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    console.log("token: ", token);

    if (!token) {
      return req;
    }

    // If token verified, adds decoded user's data to req so it can be accessed in server/schemas/resolvers.js
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token!");
    }

    // Rreturns req object to be passed to server/schemas/resolvers.js as "context" *IMPORTANT CONCEPT TO LEARN!*
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
