import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, Navigate } from "react-router-dom";

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
    getAllItem();
  }, []);

  return (
    <>
      <div className="home-welcome-pic">
        <div className="content-vision-mission">
          <h5>
            <strong>Mission</strong>
            <br></br>
            To use the power of emerging technology to make Coding books more
            accessible and cheaper for everyone, so that one day everyone in the
            world will have ready access to the world of Coding books.
            <br></br>
            <strong>Vision</strong>
            <br></br>
            To make eBooks.com the simplest, most beautiful access point for all
            the world’s books.
          </h5>
        </div>
        <div className="category">
          <ul className="ul-category">
            <li>
              <Link to="/python">Python</Link>
            </li>
            <li>
              <Link to="/python">Ruby</Link>
            </li>
            <li>
              <Link to="/python">Swift</Link>
            </li>
            <li>
              <Link to="/javascript">Javascript</Link>
            </li>
            <li>
              <Link to="/java">Java</Link>
            </li>
          </ul>
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
    </>
  );
}

export default HomePage;
