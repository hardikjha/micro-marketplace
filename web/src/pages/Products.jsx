import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    API.get(`/products?search=${search}&page=${page}`)
      .then(res => setProducts(res.data.products));
  }, [search, page]);

  return (
    <>
      <input
        placeholder="Search..."
        onChange={(e)=>setSearch(e.target.value)}
      />
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p._id} product={p}/>
        ))}
      </div>

      <button onClick={()=>setPage(p=>p-1)}>Prev</button>
      <button onClick={()=>setPage(p=>p+1)}>Next</button>
    </>
  );
}
