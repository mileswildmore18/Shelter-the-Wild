// Third party modules
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
require("dotenv").config();

const secret = process.env.SECRET;
console.log(secret);


// Built-in modules
const express = require("express");
const path = require("path");

// Local modules
const { authMiddleware } = require("./utils/auth");

// Schema imports
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");

// Server info - initialized app and creates port
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// New instance of Apollo server w/ GraphQL schema

const startApolloServer = async () => {
  await server.start();

  // Middleware- sets up bode parsing, static, and route
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // If in production node env, serves client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Starts server on port
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Start server (async!)
startApolloServer();
