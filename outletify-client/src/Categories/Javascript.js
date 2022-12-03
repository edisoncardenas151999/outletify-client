import { useState, useEffect } from "react";

import ItemCard from "../components/ItemCard";
import axios from "axios";

const Javascript = () => {
  const [items, setItems] = useState(null);
  const categoryId = "638b81adfd6737d69febe020";
  const API_URL = "http://localhost:5005";
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/category/${categoryId}`, {
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
      {items?.items?.map((item, index) => (
        <ItemCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Javascript;
