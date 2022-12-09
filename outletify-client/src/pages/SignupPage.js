import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://codebooks.fly.dev";

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
                          <Link className="logo" to={"/"}>
                            <img
                              src="https://images-platform.99static.com/kXV-v6IrH6Dgg41p5NGqdgbog3g=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/118/118605/attachment_118605478"
                              className="logo"
                            />
                          </Link>
                          <form onSubmit={handleSignupSubmit}>
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
                                placeholder="Your Password"
                                value={password}
                                onChange={handlePassword}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="form-group mt-5">
                              <input
                                type="text"
                                name="name"
                                className="form-style"
                                placeholder="Your Name"
                                value={name}
                                onChange={handleName}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <button className="btn mt-4" type="submit">
                              Signup
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
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
