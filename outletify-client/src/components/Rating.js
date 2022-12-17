import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Rating = () => {
  const API_URL = "https://codebooks.fly.dev";
  const [rate, setRate] = useState(0);
  const { itemId } = useParams();
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSave = (e) => {
    e.preventDefault();
    const requestBody = { rate };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/auth/save-rating/${itemId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRate(0);
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSave}>
          <label>Rating:</label>
          <input
            type="number"
            name="rate"
            value={rate}
            min="1"
            max="5"
            onChange={(e) => setRate(e.target.value)}
          />

          <button type="submit">Add a rating</button>
        </form>
      </div>
    </div>
  );
};

export default Rating;
