import { useState, useEffect } from "react";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";
import ItemCard from "../components/ItemCard";
import axios from "axios";

const Inventory = () => {
  const [items, setItems] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const API_URL = "https://codebooks.fly.dev/";
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/inventory/${userId}`, {
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
      {items?.inventory?.map((item, index) => (
        <ItemCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Inventory;
