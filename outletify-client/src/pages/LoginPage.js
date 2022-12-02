import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

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
        <div class="section">
          <div class="container">
            <div class="row full-height justify-content-center">
              <div class="col-12 text-center align-self-center py-5">
                <div class="section pb-5 pt-5 pt-sm-2 text-center">
                  <input
                    class="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />

                  <div class="card-3d-wrap mx-auto">
                    <div class="card-3d-wrapper">
                      <div class="card-front">
                        <div class="center-wrap">
                          <div class="section text-center">
                            //todo LOGO
                            <form onSubmit={handleLoginSubmit}>
                              <div class="form-group mb-3">
                                <input
                                  type="email"
                                  name="email"
                                  class="form-style"
                                  placeholder="Your Email"
                                  id="logemail"
                                  autocomplete="off"
                                  value={email}
                                  onChange={handleEmail}
                                />
                                <i class="input-icon uil uil-at"></i>
                              </div>
                              <div class="form-group mt-5">
                                <input
                                  type="password"
                                  name="password"
                                  class="form-style"
                                  value={password}
                                  onChange={handlePassword}
                                  placeholder="Your Password"
                                  id="logpass"
                                  autocomplete="off"
                                />
                                <i class="input-icon uil uil-lock-alt"></i>
                              </div>
                              <button class="btn mt-4" type="submit">
                                Login
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="card-back">
                        <div class="center-wrap">
                          <div class="section text-center">
                            <h4 class="mb-4 pb-3">Sign Up</h4>
                            <div class="form-group">
                              <input
                                type="text"
                                name="logname"
                                class="form-style"
                                placeholder="Your Full Name"
                                id="logname"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-user"></i>
                            </div>
                            <div class="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                class="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-at"></i>
                            </div>
                            <div class="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                class="form-style"
                                placeholder="Your Password"
                                id="logpass"
                                autocomplete="off"
                              />
                              <i class="input-icon uil uil-lock-alt"></i>
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
