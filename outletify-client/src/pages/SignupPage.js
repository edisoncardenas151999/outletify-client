import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <div class="section">
        <div class="container">
          <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
              <div class="section pb-5 pt-5 pt-sm-2 text-center">
                <div class="card-3d-wrap mx-auto">
                  <div class="card-3d-wrapper">
                    <div class="card-front">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <Link className="logo" to={"/"} Link>
                            <img
                              src="https://images-platform.99static.com/kXV-v6IrH6Dgg41p5NGqdgbog3g=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/118/118605/attachment_118605478"
                              className="logo"
                            />
                          </Link>
                          <form onSubmit={handleSignupSubmit}>
                            <div class="form-group mb-3">
                              <input
                                type="email"
                                name="email"
                                class="form-style"
                                placeholder="Your Email"
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
                                placeholder="Your Password"
                                value={password}
                                onChange={handlePassword}
                              />
                              <i class="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div class="form-group mt-5">
                              <input
                                type="text"
                                name="name"
                                class="form-style"
                                placeholder="Your Name"
                                value={name}
                                onChange={handleName}
                              />
                              <i class="input-icon uil uil-at"></i>
                            </div>
                            <button class="btn mt-4" type="submit">
                              Signup
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="card-back">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <div class="form-group">
                            <input
                              type="text"
                              name="logname"
                              class="form-style"
                              placeholder="Your Full Name"
                            />
                            <i class="input-icon uil uil-user"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input
                              type="email"
                              name="logemail"
                              class="form-style"
                              placeholder="Your Email"
                            />
                            <i class="input-icon uil uil-at"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              class="form-style"
                              placeholder="Your Password"
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

                <p className="mt-5">Already have an account?</p>
                <Link to={"/login"}> Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
