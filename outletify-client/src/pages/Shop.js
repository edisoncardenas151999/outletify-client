import { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import { useParams } from "react-router-dom";

const Shop = () => {
  const API_URL = "http://localhost:5005";
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

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllItem();
  }, []);
  return (
    <div className="item-container">
      {Items.map((item) => (
        <ItemCard key={item._id} {...item} />
      ))}
    </div>
  );
};

export default Shop;