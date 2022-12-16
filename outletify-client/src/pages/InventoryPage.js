import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://codebooks.fly.dev";

const InventoryPage = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const [buyer, setBuyer] = useState(null);

  const getBuyer = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/item/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setBuyer(response?.data);
      })
      .catch((error) => console.log(error));
  };

  const getItem = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/items/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneItem = response.data;
        setItem(oneItem);
        getBuyer();
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
            {buyer?.map((buyer, index) => (
              <p className="buyer" key={index}>
                {buyer?.name} bought this product :
                <a href={`mailto: ${buyer?.email}`}>Send Product</a>
              </p>
            ))}
            <p>{item?.name}</p>
            <br></br>
            {item?.img ? (
              <img src={item?.img} alt="pic" />
            ) : (
              <img src="/image.png" alt="pic" />
            )}
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
