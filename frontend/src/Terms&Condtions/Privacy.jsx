import React from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";
import MetaData from "../component/layouts/MataData/MataData";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <MetaData title={"Privacy Policy | StyleIn"} />

      <div className="container___">
        <h1>Privacy Policy of StyleIn</h1>

        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          Effective Date: 23-12-2021
        </p>

        <p>
          At <strong>StyleIn</strong>, your privacy is extremely important to us.
          This Privacy Policy explains how we collect, use, store, and protect
          your personal information when you access or use our website and
          services. By using StyleIn, you agree to the practices described in
          this Privacy Policy.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Personal Information</h3>
        <p>
          We may collect personal information that you voluntarily provide when
          you create an account, place an order, subscribe to our newsletters,
          participate in promotions, or contact customer support. This may
          include your name, email address, phone number, shipping address,
          billing address, and payment details.
        </p>

        <h3>1.2 Non-Personal Information</h3>
        <p>
          We may automatically collect non-personal information when you browse
          our website. This includes IP address, browser type, device
          information, operating system, referring URLs, and browsing behavior.
        </p>

        <h2>2. How We Use Your Information</h2>

        <h3>2.1 Use of Personal Information</h3>
        <p>Your personal information may be used to:</p>
        <ul>
          <li>Process and deliver your orders</li>
          <li>Provide customer service and respond to inquiries</li>
          <li>Send order updates, promotions, and marketing communications</li>
          <li>Improve our products, services, and website experience</li>
          <li>Personalize your shopping experience</li>
          <li>Detect and prevent fraud or misuse of our platform</li>
        </ul>

        <h3>2.2 Use of Non-Personal Information</h3>
        <p>Non-personal information may be used for:</p>
        <ul>
          <li>Website analytics and performance monitoring</li>
          <li>Understanding user preferences and trends</li>
          <li>Improving content, design, and functionality</li>
          <li>Creating aggregated statistical reports</li>
        </ul>

        <h2>3. Disclosure of Information</h2>
        <p>
          StyleIn may share your information in the following circumstances:
        </p>
        <ul>
          <li>
            With trusted third-party service providers for payment processing,
            shipping, analytics, and customer support
          </li>
          <li>
            To comply with legal obligations or respond to lawful requests
          </li>
          <li>
            In connection with a business transfer, merger, or acquisition
          </li>
          <li>With your explicit consent</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement reasonable technical and organizational security measures
          to protect your data. However, no online transmission or storage
          system can be guaranteed to be 100% secure.
        </p>

        <h2>5. Children’s Privacy</h2>
        <p>
          StyleIn does not knowingly collect personal information from children
          under the age of 13. If such information is identified, we will take
          immediate steps to remove it from our systems.
        </p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Any changes will be
          posted on this page and will become effective immediately upon
          posting. We encourage users to review this page regularly.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at{" "}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
            }}
          >
            StyleIn Support
          </Link>
          .
        </p>

        <p>
          By using the StyleIn website and services, you consent to the
          collection, use, and disclosure of information as described in this
          Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
