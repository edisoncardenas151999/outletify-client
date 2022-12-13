import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { AuthContext } from "../context/auth.context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const API_URL = "https://codebooks.fly.dev";

function ItemDetailsPage(props) {
  const Navigate = useNavigate();

  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const [updatedUser, setUpdatedUser] = useState(null);
  const { isLoggedIn, user } = useContext(AuthContext);
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

  const userId = user?._id;

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/auth/updatedUser/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUpdatedUser(response?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const MySwal = withReactContent(Swal);

  function refreshPage() {
    window.location.reload(false);
  }

  const handleAddToCart = async () => {
    const requestBody = { item };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/auth/order/${itemId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response?.data, "res");
      });
    Navigate(`/user/${user?._id}`);
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
        url: "https://codebooks.fly.dev/auth/payment",
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

  const renderCartButtons = () => {
    return (
      isLoggedIn && (
        <>
          <button onClick={handleAddToCart}> Add to cart</button>
          <StripeCheckout
            stripeKey={key}
            label="Pay Now"
            billingAddress
            shippingAddress
            amount={priceForStripe}
            description={`your total is $${item?.price}`}
            token={payNow}
          />
        </>
      )
    );
  };
  const priceForStripe = item?.price * 100;

  // const deleteItem = () => {
  //   axios
  //     .delete(`${API_URL}/auth/item/${itemId}/delete`)
  //     .then(() => {
  //       Navigate(`/user/${userId}`);
  //     })
  //     .catch((err) => console.log(err));
  // };

  console.log(updatedUser, "updated user");
  const includes = updatedUser?.inventory;
  console.log(includes, "id");

  return (
    <>
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
            {updatedUser?.cart?.includes(itemId) ? (
              <>
                <button className="disable" disabled>
                  In Cart
                </button>
              </>
            ) : updatedUser?.inventory?.includes(itemId) ? (
              <>
                <Link to={`/item/edit/${item?._id}`}>Edit</Link>
              </>
            ) : (
              renderCartButtons()
            )}
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
}

export default ItemDetailsPage;
