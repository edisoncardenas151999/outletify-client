import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://codebooks.fly.dev";

function Sell(props) {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, price, description, userId, category };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/auth/sell/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setName("");
        setDescription("");
        setPrice(0);
        setCategory("");
        navigate(`/inventory/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="row full-height justify-content-center">
        <div className="col-12 text-center align-self-center py-5">
          <div
            className="section pb-5 pt-5 pt-sm-2 text-center"
            id="sell-container"
          >
            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <h4>Sell Book</h4>
                  <div className="center-wrap">
                    <div className="section text-center">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label>Name:</label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-5">
                          <label>Price $:</label>
                          <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="form-group mt-5">
                          <label>Category:</label>
                          <input
                            type="text"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          />
                        </div>

                        <div className="form-group mt-5">
                          <label>Description:</label>
                          <textarea
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <button type="submit">Sell</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sell;
