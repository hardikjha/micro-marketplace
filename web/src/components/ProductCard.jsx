import { Link } from "react-router-dom";
import API from "../api";

export default function ProductCard({ product }) {

  const favorite = async () => {
    await API.post(`/users/favorites/${product._id}`);
    alert("Added to favorites");
  };

  return (
    <div className="card">
      <img src={product.image}/>
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>

      <Link to={`/products/${product._id}`}>View</Link>
      <button onClick={favorite}>❤️</button>
    </div>
  );
}
