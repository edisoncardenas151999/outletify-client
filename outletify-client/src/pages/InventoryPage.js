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

            <img src={item?.img} alt="pic" />
            <p>{`$${item?.price}`}</p>
            <Link to={`/item/edit/${item?._id}`}>Edit</Link>
          </div>

          <div className="description-container">
            <div className="description">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
