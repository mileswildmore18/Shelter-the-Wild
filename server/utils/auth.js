const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "puppos";
const expiration = "2h";

module.exports = {
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
