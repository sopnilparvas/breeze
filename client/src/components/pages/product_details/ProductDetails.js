import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductItem from "../utils/product_item/ProductItem";
import { GlobalState } from "../../../GlobalState";

function ProductDetails() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach(product => {
        if (product._id === params.id) setProductDetails(product);
      });
    }
  }, [params, products]);

  if (productDetails.length === 0) return null;

  return (
    <>
      <div className='detail'>
        <img src={productDetails.images.url} alt='' />
        <div className='box-detail'>
          <div className='row'>
            <h2>{productDetails.title}</h2>
            <h6>#id: {productDetails.product_id}</h6>
          </div>
          <span>$ {productDetails.price}</span>
          <p>{productDetails.description}</p>
          <p>{productDetails.content}</p>
          <p>Sold: {productDetails.sold}</p>
          <Link to='/cart' className='cart'>
            Buy now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related Products</h2>
        <div className='products'>
          {products.map(product => {
            return product.category === productDetails.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
