import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import toast from "react-hot-toast";

const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "delievered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data?.orders);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Layout title={"All Orders -Data"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Orders</h1>
              {orders?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o?._id, value)}
                              defaultValue={o?.status}
                            >
                              {status?.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.buyer.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Sucess" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container d-flex flex-wrap">
                      {o?.products?.map((p, index) => (
                        <div className="row mb-2 card p-3 flex-row" key={index}>
                          <div className="col-md-4">
                            <img
                              style={{
                                objectFit: "contain",
                                height: "100px",
                                width: "120px",
                              }}
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top me-3"
                              alt={p.name}
                            />
                          </div>
                          <div className="col-md-8 ">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price:{p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminOrders;
