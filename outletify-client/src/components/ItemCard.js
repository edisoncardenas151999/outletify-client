import { Link } from "react-router-dom";

function ItemCard({ name, _id, price, img }) {
  return (
    <div className="item-page">
      <Link to={`/item/${_id}`}>
        <strong className="item-name">{name}</strong>
        <br />
        <img src={img} alt="pic" />
        <p>{`$${price}`}</p>
      </Link>
    </div>
  );
}

export default ItemCard;
