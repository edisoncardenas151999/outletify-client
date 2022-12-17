import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";
import Rating from "../components/Rating";

const API_URL = "https://codebooks.fly.dev";

function ItemEdit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const userId = user?._id;
  const { itemId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/items/${itemId}`)
      .then((response) => {
        const oneItem = response.data;
        setName(oneItem?.name);
        setDescription(oneItem?.description);
        setCategory(oneItem?.category);
        setPrice(oneItem?.price);
      })
      .catch((error) => console.log(error));
  }, [itemId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, category, price, description };
    axios
      .put(`${API_URL}/auth/item/${itemId}/edit`, requestBody)
      .then((response) => {
        navigate(`/inventory/${userId}`);
      });
  };

  const deleteProject = () => {
    axios
      .delete(`${API_URL}/auth/item/${itemId}/delete`)
      .then(() => {
        navigate(`/inventory/${userId}`);
      })
      .catch((err) => console.log(err));
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
                  <div className="center-wrap">
                    <div className="section text-center">
                      <form onSubmit={handleFormSubmit}>
                        <div className="form-group mb-3">
                          <label>Name:</label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-5">
                          <label>Price:</label>
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
                        <button type="submit">Save</button>
                      </form>
                      <button onClick={deleteProject}>Delete</button>
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
export default ItemEdit;
