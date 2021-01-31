import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
  };
}

export default ProductsAPI;
