import React from "react";
import "./TermsAndCondtion.css";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";

const TermsAndConditionsPage = () => {
  return (
    <div className="terms-container">
      <MetaData title="Terms and Conditions | StyleIn" />

      <img
        src={TermsImage}
        alt="StyleIn Terms and Conditions"
        className="terms-image"
      />

      <div className="terms-overlay">
        <h1 className="terms-title">TERMS & CONDITIONS</h1>
      </div>

      <div className="terms-content">
        <p>
          Welcome to <strong>StyleIn</strong>. Thank you for choosing us as your
          destination for premium fashion and lifestyle products. By accessing
          or purchasing from our website, you agree to comply with the following
          Terms and Conditions.
        </p>

        <p>
          Please read these terms carefully before using our services. If you do
          not agree with any part of these terms, you should not use our website
          or place an order.
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By placing an order on StyleIn (“we”, “our”, “us”), you (“Customer”,
          “you”) confirm that you have read, understood, and agreed to these
          Terms and Conditions along with our Privacy Policy, Return Policy, and
          any other guidelines posted on the website.
        </p>

        <h2>Orders & Availability</h2>
        <p>
          All orders placed on StyleIn are subject to acceptance and product
          availability. We reserve the right to cancel or refuse any order at
          our discretion, including orders with incorrect pricing, suspected
          fraud, or limited stock availability.
        </p>

        <h2>Product Information</h2>
        <p>
          We strive to display product descriptions, images, and colors as
          accurately as possible. However, slight variations may occur due to
          screen settings, lighting, or manufacturing differences.
        </p>

        <h2>Pricing</h2>
        <p>
          All prices listed on StyleIn are subject to change without prior
          notice. Prices displayed exclude shipping charges unless stated
          otherwise. Any applicable taxes will be calculated during checkout.
        </p>

        <h2>Offers & Promotions</h2>
        <p>
          Promotional offers, discount codes, and special deals are valid for a
          limited time and are subject to specific terms. StyleIn reserves the
          right to modify or withdraw any offer without prior notice.
        </p>

        <h2>Payment</h2>
        <p>
          Full payment must be made at the time of purchase. We accept secure
          online payments through supported debit cards, credit cards, UPI, and
          other digital payment methods as displayed during checkout.
        </p>

        <h2>Shipping & Delivery</h2>
        <p>
          Estimated delivery times are provided for convenience and may vary
          depending on location and courier service. StyleIn is not responsible
          for delays caused by external factors beyond our control.
        </p>

        <h2>Returns & Refunds</h2>
        <p>
          Products can be returned in accordance with our Return Policy. Items
          must be unused, unwashed, and in original packaging. Refunds will be
          processed after quality inspection and approval.
        </p>

        <h2>Warranty</h2>
        <p>
          Certain products may come with a manufacturer warranty. Warranty
          details, if applicable, will be mentioned on the product page or
          provided with the item.
        </p>

        <h2>Personal Use Only</h2>
        <p>
          Products purchased from StyleIn are intended for personal use only.
          Resale or commercial use without written permission is strictly
          prohibited.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on StyleIn, including logos, designs, images, text, and
          graphics, is the intellectual property of StyleIn and may not be used
          without prior written consent.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          StyleIn shall not be liable for any indirect, incidental, or
          consequential damages arising from the use or inability to use our
          website or products.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms and Conditions shall be governed and interpreted in
          accordance with the laws of India. Any disputes shall be subject to
          the jurisdiction of Indian courts.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          StyleIn reserves the right to update or modify these Terms and
          Conditions at any time. Continued use of the website after changes
          implies acceptance of the revised terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          For any questions or concerns regarding these Terms and Conditions,
          please contact our customer support team through the official StyleIn
          website.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
