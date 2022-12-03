import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import { useParams, Link, Navigate } from "react-router-dom";

const Cart = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const [items, setItems] = useState(null);
  const { userId } = useParams();
  const API_URL = "http://localhost:5005";
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="item-container">
      {items?.cart?.map((item, index) => (
        <ItemCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Cart;
