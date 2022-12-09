import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import { useParams, Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const key =
    "pk_test_51M9ZjvG6NeaDtKpVRFtUgmoFVxEMaTjHtPct35DcaB1DLIyvoEqXQ6vAvcgqKcp7cfjeIs5J0ZH94EhjCsSyWN7Z00xeCRkTs7";

  const [userCart, setUserCart] = useState(null);

  const { userId } = useParams();
  const API_URL = "https://codebooks.fly.dev/";

  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setUserCart(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleClearCart = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/auth/cart/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setUserCart(response.data))
      .catch((error) => console.log(error));
  };

  const MySwal = withReactContent(Swal);
  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was succesful",
      time: 1000,
    });
  };
  console.log(userCart?.cart[0]?.price);

  const totalPrice = userCart?.cart?.reduce(function (acc, val) {
    console.log(acc, "acc");
    console.log(val, "val");
    return acc + val?.price;
  }, 0);

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "https://codebooks.fly.dev//auth/payment",
        method: "post",
        data: {
          amount: totalPrice * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleClearCart();
        handleSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {userCart ? (
        <div className="item-container">
          <div className="payment-container">
            {isLoggedIn && (
              <StripeCheckout
                stripeKey={key}
                label="Pay Now"
                billingAddress
                shippingAddress
                amount={totalPrice * 100}
                description={`your total is $${totalPrice}`}
                token={payNow}
              />
            )}
            <p>{`total is ${totalPrice}`}</p>
          </div>
          {userCart?.cart?.map((item, index) => (
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
      ) : (
        "No Items In Cart"
      )}
    </>
  );
};

export default Cart;
