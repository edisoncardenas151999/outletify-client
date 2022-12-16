import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const Stripekey =
    "pk_test_51M9ZjvG6NeaDtKpVRFtUgmoFVxEMaTjHtPct35DcaB1DLIyvoEqXQ6vAvcgqKcp7cfjeIs5J0ZH94EhjCsSyWN7Z00xeCRkTs7";

  const { isLoggedIn } = useContext(AuthContext);
  const [cart, setCart] = useState();
  const { userId } = useParams();
  const API_URL = "https://codebooks.fly.dev";
  const navigate = useNavigate();

  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCart(response?.data?.cart);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleBuyCart = () => {
    const storedToken = localStorage.getItem("authToken");
    const cartId = cart?.map((item) => item?._id);
    const requestBody = { cartId };
    console.log(requestBody, "req.body");
    axios
      .put(`${API_URL}/auth/buyCart/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const handleClearCart = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/auth/cart/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => handleBuyCart())
      .then(() => getAllItems())
      .catch((error) => console.log(error));
  };

  const MySwal = withReactContent(Swal);

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was succesful",
    });
  };

  const totalPrice = cart?.reduce(function (acc, val) {
    return acc + val?.price;
  }, 0);

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "https://codebooks.fly.dev/auth/payment",
        method: "post",
        data: {
          amount: totalPrice * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
        handleClearCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="category">
        <ul className="ul-category">
          <li>Cart</li>
        </ul>
      </div>
      {cart?.length ? (
        <>
          <div className="payment-container">
            {isLoggedIn && (
              <StripeCheckout
                stripeKey={Stripekey}
                label="Pay Now"
                billingAddress
                shippingAddress
                amount={totalPrice * 100}
                description={`your total is $${totalPrice}`}
                token={payNow}
              />
            )}
            <p>{`total is $${totalPrice}`}</p>
          </div>
          <div className="item-container">
            {cart?.map((item, index) => (
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
      ) : (
        "No Items In Cart"
      )}
    </>
  );
};

export default Cart;
