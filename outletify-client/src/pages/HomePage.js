import { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import { useParams, Link, Navigate } from "react-router-dom";

import StripeCheckout from "react-stripe-checkout";

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
    <div>
      {Items.map((item) => (
        <ItemCard key={item._id} {...item} />
      ))}
    </div>
  );
}

export default HomePage;
