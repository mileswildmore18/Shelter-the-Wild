import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";

/// IMPORT PAGES ///
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PetBlog from "./pages/PetBlog";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "/blog",
        element: <PetBlog />,
      },
      {
        path: "/profile/:profileId",
        element: <Profile />,
      },
 
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
