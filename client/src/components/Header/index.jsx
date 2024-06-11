import "./style.css";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Link to='/'>
          {" "}
          <h1>PARSR</h1>
        </Link>

        <p>Project Animal Reunification Search & Rescue</p>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link to='/profile'>Your Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}
        <Link to='/map'>Map</Link>
      </div>
    </header>
  );
};

export default Header;
