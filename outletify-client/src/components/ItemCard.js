import { Link } from "react-router-dom";

function ItemCard({ name, _id, price }) {
  return (
    <div >
      <Link to={`/item/${_id}`}>
        <h3>{name}</h3>
        <p>{`$${price}`}</p>
      </Link>
    </div>
  );
}

export default ItemCard;
