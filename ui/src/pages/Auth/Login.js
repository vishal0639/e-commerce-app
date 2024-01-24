import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  let initialAccount = {
    email: "",
    password: "",
  };
  const [account, setAccount] = useState(initialAccount);

  const changeHandler = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/vi/auth/login", account);
      if (res?.data?.success) {
        toast.success(res.data && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
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
          <h1 className="title">LOGIN FORM</h1>
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
