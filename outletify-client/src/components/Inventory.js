import { useState, useEffect } from "react";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Inventory = () => {
  const [items, setItems] = useState(null);
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const API_URL = "https://codebooks.fly.dev";

  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/inventory/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setItems(response.data.inventory))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllItems();
  }, []);
  console.log(items);
  return (
    <>
      <div className="category">
        <ul className="ul-category">
          <li>Inventory</li>
        </ul>
      </div>
      {items?.length ? (
        <div className="item-container">
          {items?.map((item, index) => (
            <div className="item-page" key={index}>
              <Link to={`/inventoryPage/${item?._id}`}>
                <strong className="item-name">{item?.name}</strong>
                <br />
                {item?.img ? (
                  <img src={item?.img} alt="pic" />
                ) : (
                  <img src="/image.png" alt="pic" />
                )}
                <p>{`$${item?.price}`}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        "No Items in Inventory, This is where you'll see books that you've sell."
      )}
    </>
  );
};

export default Inventory;
