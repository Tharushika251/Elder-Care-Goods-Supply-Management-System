import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          "Welcome to Forever Caring Corner, where we're dedicated to providing innovative solutions for elder care. At Forever Caring Corner, we understand the importance of ensuring the health, safety, and comfort of our senior community. That's why we've developed a user-friendly app that streamlines access to essential care resources. With a team passionate about elder well-being, we're committed to making every interaction with our app seamless and empowering. Join us on our journey to redefine elder care, one thoughtful feature at a time."
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
