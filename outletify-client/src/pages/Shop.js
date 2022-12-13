import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Shop = () => {
  const API_URL = "https://codebooks.fly.dev";
  const [Items, setItems] = useState([]);

  const getAllItem = () => {
    const storedToken = localStorage.getItem("authToken");
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
        {Items.map((item, index) => (
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
    </>
  );
};

export default Shop;
