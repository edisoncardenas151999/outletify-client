import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://codebooks.fly.dev";

const InventoryPage = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

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
    <>
      <div className="item-detail-container">
        <div className="item-detail">
          <div>
            <p>{item?.name}</p>
            <br></br>
            <img src={item?.img} alt="image.png" />

            <p>{`$${item?.price}`}</p>
            <Link to={`/item/edit/${item?._id}`}>Edit</Link>
          </div>
          <div className="description-container">
            <div className="description">
              <p>{item?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
