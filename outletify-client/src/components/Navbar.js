import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const userId = user?._id;
  return (
    <header className="  header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link className="logo" to={"/"}>
                <img
                  src="https://images-platform.99static.com/kXV-v6IrH6Dgg41p5NGqdgbog3g=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/118/118605/attachment_118605478"
                  className="logo"
                />
              </Link>
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to={`/`}>Home</Link>
                </li>
                <li className="scroll-to-section">
                  <Link to="/shop">Shop</Link>
                </li>

                {isLoggedIn && (
                  <>
                    <li className="scroll-to-section">
                      <Link to={`/sell/${userId}`}>Sell</Link>
                    </li>
                    <li className="scroll-to-section">
                      <Link to={`inventory/${userId}`}>Inventory</Link>
                    </li>

                    <li>
                      <Link to={`/user/${userId}`}>Cart</Link>
                    </li>
                    <li>
                      <Link to={`/library`}>Library</Link>
                    </li>
                    <li>
                      <button onClick={logOutUser}>Log Out</button>
                    </li>
                  </>
                )}

                {!isLoggedIn && (
                  <>
                    <li className="scroll-to-section">
                      <a href="/#about">About</a>
                    </li>
                    <li>
                      <Link to="/signup">
                        <button>Sign Up</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/login">
                        <button>Log In</button>
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
