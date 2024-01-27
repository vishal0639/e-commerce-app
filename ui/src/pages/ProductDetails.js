import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  //inital product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (err) {
      console.log(err);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title={`Product Details-${params?.slug}`}>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            height="300"
            width={"350px"}
            alt={product.name}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h4>Name:{product.name}</h4>
          <h4>Description:{product.description}</h4>
          <h4>Price:{product.price}</h4>
          <h4>Category:{product?.category?.name}</h4>
          <button className="btn btn-secondary ms-1">Add To Cart</button>
        </div>
      </div>
      <hr></hr>
      <div className="row container">
        <h6>Similar Product</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p, index) => (
            <div className="card m-2" key={index} style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text ">{p.description.substring(0, 24)}..</p>
                <p className="card-text mb-1">${p.price}</p>
                <button className="btn btn-secondary ms-1">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
