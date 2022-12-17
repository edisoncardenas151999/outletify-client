import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const Library = () => {
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState();
  const userId = user?._id;

  const getItems = () => {
    const API_URL = "https://codebooks.fly.dev";
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/buyerItems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setItem(response?.data?.PurchasesList);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getItems();
  }, []);

  console.log(item, "item");
  //   console.log(arr, "asadas");

  return (
    <>
      {item?.length ? (
        <div className="item-container">
          {item?.map((item, index) => (
            <div key={index}>
              <div className="item-page">
                <Link to={`/item/${item?._id}`}>
                  <strong className="item-name">{item?.name}</strong>
                  <br />
                  {item?.img ? (
                    <img src={item?.img} alt="pic" />
                  ) : (
                    <img src="/image.png" alt="pic" />
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "No Items in Library"
      )}
    </>
  );
};

export default Library;
