import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const userId = user?._id;
  return (
    <nav>
      <Link to="/">Ecommerce</Link>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <Link to={`/user/${userId}`}>Cart</Link>
            </li>
            <li>
              <button onClick={logOutUser}>Logout</button>
            </li>
          </>
        )}
      </ul>

      {!isLoggedIn && (
        <>
          <ul>
            <li>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}

export default Navbar;
