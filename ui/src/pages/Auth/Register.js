import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

function Register() {
  const navigate = useNavigate();
  let initialAccount = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };
  const [account, setAccount] = useState(initialAccount);

  const changeHandler = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);
    try {
      const res = await axios.post("/api/vi/auth/register", account);
      if (res?.data?.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("some thing went wrong");
    }
  };
  return (
    <Layout title={"Register E-commerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">REGISTER FORM</h1>
          <div className="mb-3">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              type="text"
              name="name"
              value={account.name}
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              type="email"
              name="email"
              value={account.email}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              type="password"
              name="password"
              value={account.password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              type="text"
              name="phone"
              value={account.phone}
              className="form-control"
              placeholder="Enter your phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              type="text"
              name="address"
              value={account.address}
              className="form-control"
              placeholder="Enter your address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
