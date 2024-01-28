import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";

function Profile() {
  // context
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [phone, setPhone] = useState(" ");
  const [address, setAddress] = useState(" ");
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPassword("");
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        phone,
        password,
        address,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated succesfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("some thing went wrong");
    }
  };
  return (
    <Layout title={"Register E-commerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h1 className="title">USER PROFILE</h1>
                <div className="mb-3">
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter your email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                    value={password}
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    type="text"
                    value={address}
                    className="form-control"
                    placeholder="Enter your address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

/*


 */
