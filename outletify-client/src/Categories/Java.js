import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ItemCard from "../components/ItemCard";
import axios from "axios";

const Java = () => {
  const [items, setItems] = useState(null);
  const API_URL = "http://localhost:5005";
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/allItems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
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
          <li>
            <Link to="/ruby">Ruby</Link>
          </li>
        </ul>
      </div>
      <div className="item-container">
        {items?.map((item, index) => {
          const java =
            item?.category === "Java" ? (
              <ItemCard key={index} {...item} />
            ) : null;
          return java;
        })}
      </div>
    </>
  );
};

export default Java;
