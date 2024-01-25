import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const ForgotPassword = () => {
  const navigate = useNavigate();
  let initialAccount = {
    email: "",
    newPassword: "",
    answer: "",
  };
  const [account, setAccount] = useState(initialAccount);

  const changeHandler = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", account);
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
    <Layout title={"Forgot-Password E-commerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">RESET PASSWORD</h1>
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
              name="newPassword"
              value={account.newPassword}
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
              name="answer"
              value={account.answer}
              className="form-control"
              placeholder="Enter your favourite sport?"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
