import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://codebooks.fly.dev/";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        // Save the token in the localStorage.
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser(); // <== ADD
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="LoginPage">
        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <Link classNameName="logo" to={"/"} Link>
                              <img
                                src="https://images-platform.99static.com/kXV-v6IrH6Dgg41p5NGqdgbog3g=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/118/118605/attachment_118605478"
                                className="logo"
                              />
                            </Link>
                            <form onSubmit={handleLoginSubmit}>
                              <div className="form-group mb-3">
                                <input
                                  type="email"
                                  name="email"
                                  className="form-style"
                                  placeholder="Your Email"
                                  value={email}
                                  onChange={handleEmail}
                                />
                                <i className="input-icon uil uil-at"></i>
                              </div>
                              <div className="form-group mt-5">
                                <input
                                  type="password"
                                  name="password"
                                  className="form-style"
                                  value={password}
                                  onChange={handlePassword}
                                  placeholder="Your Password"
                                />
                                <i className="input-icon uil uil-lock-alt"></i>
                              </div>
                              <button className="btn mt-4" type="submit">
                                Login
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Sign Up</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                name="logname"
                                className="form-style"
                                placeholder="Your Full Name"
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Your Email"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Your Password"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}

                  <p className="mt-5">Don't have an account yet?</p>
                  <Link to={"/signup"}> Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
