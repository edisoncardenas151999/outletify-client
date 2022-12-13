import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();

  const API_URL = "https://codebooks.fly.dev";

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCurrentUser(response?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const userId = user?._id;
  return (
    <header className="header-area header-sticky">
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
                    <li className="scroll-to-section">
                      <Link to={`/sell/${userId}`}>Sell</Link>
                    </li>
                    <li className="scroll-to-section">
                      <Link to={`inventory/${userId}`}>Inventory</Link>
                    </li>
                    {currentUser?.cart?.length === 0 ? (
                      <li>
                        <Link to={`/user/${userId}`}>Cart</Link>
                      </li>
                    ) : (
                      <li>
                        <Link to={`/user/${userId}`}>
                          Cart ( {currentUser?.cart?.length} )
                        </Link>
                      </li>
                    )}

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
