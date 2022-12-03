import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const userId = user?._id;
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link className="logo" to={"/"} Link>
                <img src="./logo192.png" className="logo" />
              </Link>
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to={`/`}>About</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to={`/`}>Contact</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to="/shop">Shop</Link>
                </li>

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

                {!isLoggedIn && (
                  <>
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
                  </>
                )}
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
