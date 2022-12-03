import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import FadeInOut from "../FadeInOut";

const API_URL = "http://localhost:5005";

function HomePage() {
  const [Items, setItems] = useState([]);
  const [User, setUser] = useState("");

  const { userId } = useParams();

  const getAllItem = () => {
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/auth/allItems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  };

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneUser = response.data;
        setUser(oneUser);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="home-welcome-pic">
        <div className="category">
          <ul className="ul-category">
            <li>
              <Link to="/python">Python</Link>
            </li>
            <li>
              <Link to="/javascript">Javascript</Link>
            </li>
            <li>
              <Link to="/java">Java</Link>
            </li>
          </ul>
        </div>

        <div className="content-vision-mission">
          <h5>CODE BOOKS</h5>
          <p>
            The simplest and cheapest path to becoming a coding expert. Choose a
            language and begin your programming journey today.
          </p>
        </div>
      </div>
      <div className="home-pic-container">
        <div className="home-pic1">
          <div className="overlay"></div>
          <div className="content">TEST</div>
        </div>
        <div className="home-pic2">
          <div className="overlay"></div>
          <div className="content">TEST</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
