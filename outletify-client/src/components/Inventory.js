import { useState, useEffect } from "react";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [items, setItems] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const API_URL = "https://codebooks.fly.dev";

  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/inventory/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setItems(response.data.cart))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllItems();
  }, []);
  console.log(items);
  return (
    <div className="item-container">
      {items?.map((item, index) => (
        <div className="item-page" key={index}>
          <Link to={`/item/${item?._id}`}>
            <strong className="item-name">{item?.name}</strong>
            <br />
            <img src={item?.img} alt="pic" />
            <p>{`$${item?.price}`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
