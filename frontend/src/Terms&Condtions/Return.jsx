import React from "react";
import { Link } from "react-router-dom";
import "./Return.css";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";

const ReturnPolicyPage = () => {
  return (
    <div className="container__0">
      <MetaData title="Return Policy | StyleIn" />

      <div className="image-container">
        <img src={TermsImage} alt="Return Policy Background" />
        <h1 className="policy-text">RETURN POLICY</h1>
      </div>

      <div className="content-container">
        <p>
          Thank you for shopping with <strong>StyleIn</strong>. Your satisfaction
          is our priority. If you are not completely satisfied with your
          purchase, we offer a hassle-free return policy to ensure a smooth
          shopping experience.
        </p>

        <p>
          Most products are eligible for return within <strong>30 days</strong>{" "}
          of delivery. Certain items may have a shorter return window of{" "}
          <strong>7 days</strong>, which will be clearly mentioned on the
          product page.
        </p>

        <p>
          To be eligible for a return, the item must be unused, unwashed, and in
          its original condition with all tags and packaging intact. Proof of
          purchase is required. Customized or personalized items are not
          eligible for return unless they arrive damaged or defective.
        </p>

        <p>
          To initiate a return, please contact our Customer Support Team within
          the applicable return period. Our team will assist you with the return
          process and provide detailed instructions.
        </p>

        <p>
          Once we receive and inspect the returned item, the refund will be
          processed to the original payment method used during purchase. Refunds
          are typically completed within <strong>5–7 business days</strong>{" "}
          after approval.
        </p>

        <p>
          Return shipping costs are the responsibility of the customer unless
          the return is due to a defect, damaged item, or an error on our part.
          We strongly recommend using a trackable shipping service for your
          return.
        </p>

        <p>
          If you have any questions or need further assistance, our support team
          is always here to help.
        </p>

        <h2>Contact Information</h2>
        <p>
          Customer Support – StyleIn
          <br />
          <span style={{ fontWeight: "500" }}>Email:</span>{" "}
          support@stylein.com
          <br />
          <span style={{ fontWeight: "500" }}>Phone:</span> +91 90000 00000
          <br />
          <span style={{ fontWeight: "500" }}>
            Hours of Operation:
          </span>{" "}
          Monday to Friday, 9:00 AM – 6:00 PM (IST)
        </p>

        <p>
          For more details, please review our{" "}
          <Link
            to="/policy/return"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "500",
            }}
          >
            Return Policy
          </Link>
          . At StyleIn, we are committed to delivering quality products and
          exceptional customer service.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
