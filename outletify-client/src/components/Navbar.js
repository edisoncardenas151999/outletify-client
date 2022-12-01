import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const userId = user?._id;
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            OUTLETIFY
          </Link>
        </div>
        <ul className="nav navbar-nav">
          {isLoggedIn && (
            <>
              <button className="logout" onClick={logOutUser}>
                Logout
              </button>
              <li className="active">
                <Link to={`/user/${userId}`}>Cart</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
