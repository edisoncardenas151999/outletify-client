import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://codebooks.fly.dev";

function ItemCard() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  const getItem = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/items/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneItem = response.data;
        setItem(oneItem);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="item-page">
      <Link to={`/item/${item?._id}`}>
        <strong className="item-name">{item?.name}</strong>
        <br />
        <img src={item?.img} alt="pic" />
        <p>{`$${item?.price}`}</p>
      </Link>
    </div>
  );
}

export default ItemCard;
