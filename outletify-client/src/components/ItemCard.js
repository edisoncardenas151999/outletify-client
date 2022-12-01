import { Link } from "react-router-dom";

function ItemCard({ name, _id, price, img }) {
  return (
    <div className="item-page">
      <Link to={`/item/${_id}`}>
        <h3>{name}</h3>
        <img src={img} alt="pic" />
        <p>{`$${price}`}</p>
      </Link>
    </div>
  );
}

export default ItemCard;
