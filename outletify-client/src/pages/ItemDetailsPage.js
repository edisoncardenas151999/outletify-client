import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { AuthContext } from "../context/auth.context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const API_URL = "http://localhost:5005";

function ItemDetailsPage(props) {
  const Navigate = useNavigate();
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

  const MySwal = withReactContent(Swal);

  const handleOrder = () => {
    const requestBody = { orderedItem };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/auth/order/${itemId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(`${itemId} succesfully added to inventory`);
      });
    Navigate(`/user/${user._id}`);
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was succesful",
      time: 1000,
    });
  };

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:5005/auth/payment",
        method: "post",
        data: {
          amount: item.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const priceForStripe = item?.price * 100;
  return (
    <div className="item-detail-container">
      <div className="item-detail">
        <div>
          <p>{item?.name}</p>
          <br></br>

          <img src={item?.img} alt="pic" />
          <p>{`$${item?.price}`}</p>
          <br></br>
          {!isLoggedIn && (
            <Link to="/login">
              <button>Buy Now</button>
            </Link>
          )}

          {isLoggedIn && <button onClick={handleOrder}>Add to cart</button>}
          {isLoggedIn && (
            <StripeCheckout
              stripeKey={key}
              label="Pay Now"
              billingAddress
              shippingAddress
              amount={priceForStripe}
              description={`your total is $${item?.price}`}
              token={payNow}
            />
          )}
        </div>
        <div className="description-container">
          <div className="description">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
