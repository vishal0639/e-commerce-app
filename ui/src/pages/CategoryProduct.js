import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);
  //get products by category
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h1 className="text-center">{category?.name}</h1>
        <h5 className="text-center">{products?.length} results found</h5>
        <div className="row">
          <div className="col-md-12 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p, index) => (
                <div
                  className="card m-2"
                  key={index}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text ">
                      {p.description.substring(0, 24)}..
                    </p>
                    <p className="card-text mb-1">${p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading...." : "Load More"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
