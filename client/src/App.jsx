import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Can use public API uri
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Sets auth link and returns headers
// according to id_token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initializes client for Apollo Playground
// Caches results in apollo's InMemoryCache
const client = new ApolloClient({
  // Adds authlink and httplink together
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
        <Footer />
      </ApolloProvider>
    </>
  );
};

export default App;
