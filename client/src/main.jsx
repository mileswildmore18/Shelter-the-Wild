import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";

/// IMPORT PAGES ///
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Pet from "./pages/Pet";
import MapPage from "./pages/Map/";
import Test from "./pages/Test";
import Donate from "./pages/Donate";
import Home from "./pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <UserDashboard />,
      },
      {
        path: "/profile/:profileId",
        element: <Profile />,
      },
      {
        path: "/pet/:petId",
        element: <Pet />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
