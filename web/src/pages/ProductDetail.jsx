import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(()=>{
    API.get(`/products/${id}`)
      .then(res=>setProduct(res.data));
  },[]);

  if(!product) return <p>Loading...</p>;

  return (
    <>
      <img src={product.image}/>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
    </>
  );
}
