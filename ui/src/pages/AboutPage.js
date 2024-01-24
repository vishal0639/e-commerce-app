import React from "react";
import Layout from "../components/Layout/Layout";

function AboutPage() {
  return (
    <Layout title={"About us E-commerce App"}>
      <div className="row contactus ">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            fefuwfeuweiwtioewnviejriejoieoriew
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage;
