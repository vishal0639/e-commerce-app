import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };
  //delete item
  const removeCardItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart?.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p, index) => (
              <div className="row mb-2 card p-3 flex-row" key={index}>
                <div className="col-md-4">
                  <img
                    style={{ objectFit: "contain" }}
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    width="60px"
                    alt={p.name}
                    height="100px"
                  />
                </div>
                <div className="col-md-8 ">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price:{p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeCardItem(p._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <hr />
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total:{totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
