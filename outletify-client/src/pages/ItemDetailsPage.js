import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function ItemDetailsPage(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [orderedItem, setOrderedItem] = useState([]);
  const { itemId } = useParams();
  const key =
    "pk_test_51M9ZjvG6NeaDtKpVRFtUgmoFVxEMaTjHtPct35DcaB1DLIyvoEqXQ6vAvcgqKcp7cfjeIs5J0ZH94EhjCsSyWN7Z00xeCRkTs7";

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

  const handleOrder = () => {
    const requestBody = { orderedItem };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/auth/order/${itemId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(`${itemId} succesfully added to inventory`);
      })
      .catch((error) => console.log(error));
  };

  const priceForStripe = item?.price * 100;
  return (
    <div>
      <p>{item?.name}</p>
      <img src={item?.img} alt="pic" />
      <p>{`$${item?.price}`}</p>
      {isLoggedIn && <button onClick={handleOrder}>Add to cart</button>}

      <StripeCheckout
        stripeKey={key}
        label="Pay Now"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`your total is $${item?.price}`}
        // token={payNow}
      />
    </div>
  );
}

export default ItemDetailsPage;
