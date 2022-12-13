import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ItemCard from "../components/ItemCard";
import axios from "axios";

const Java = () => {
  const [items, setItems] = useState(null);
  const API_URL = "https://codebooks.fly.dev";
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
            item?.category === "java" ? (
              <div className="item-page" key={index}>
                <Link to={`/item/${item?._id}`}>
                  <strong className="item-name">{item?.name}</strong>
                  <br />
                  <img src={item?.img} alt="pic" />
                  <p>{`$${item?.price}`}</p>
                </Link>
              </div>
            ) : null;
          return java;
        })}
      </div>
    </>
  );
};

export default Java;
