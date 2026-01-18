import React from "react";
import "./Privacy.css";
import MetaData from "../component/layouts/MataData/MataData";

const TermsAndConditions = () => {
  return (
    <div className="privacy-policy-container">
      <MetaData title="Terms And Conditions | StyleIn" />

      <div className="container___">
        <h1>Terms and Conditions of Sale</h1>

        <p>
          Welcome to <strong>StyleIn</strong>. Thank you for choosing StyleIn as
          your destination for fashion, lifestyle, and premium apparel. We are
          committed to providing you with a smooth and secure shopping
          experience.
        </p>

        <p>
          By accessing our website or placing an order, you agree to these Terms
          and Conditions along with our Privacy Policy, Return Policy, and any
          additional policies displayed on our website. Please review them
          carefully before making a purchase.
        </p>

        <h2>Acceptance of These Terms</h2>
        <p>
          You (“Customer”, “you”) may place orders for products with StyleIn
          (“we”, “our”, “us”) via our website. By placing an order, you confirm
          your acceptance of these Terms and Conditions of Sale (“Terms”). Any
          terms inconsistent with these Terms shall not apply unless expressly
          agreed to in writing by StyleIn.
        </p>

        <h2>Orders</h2>
        <p>
          All orders are subject to acceptance by StyleIn. We reserve the right
          to refuse, cancel, or limit any order for any reason, including pricing
          errors, suspected fraud, or stock unavailability. Order confirmation
          does not signify final acceptance. If payment has already been made,
          eligible refunds will be processed.
        </p>

        <h2>Product Information</h2>
        <p>
          Product descriptions, images, colors, and specifications are provided
          for reference only and may be updated without prior notice. Minor
          variations may occur due to screen resolution, lighting conditions, or
          manufacturing processes.
        </p>

        <h2>Pricing</h2>
        <p>
          Prices displayed on StyleIn are subject to change prior to order
          acceptance. Prices do not include shipping charges unless explicitly
          mentioned. In case of pricing errors, StyleIn reserves the right to
          correct them and notify customers before processing the order.
        </p>

        <h2>Special Offers</h2>
        <p>
          Promotional offers, discounts, and limited-time deals may be available
          periodically. Such offers are subject to specific conditions and may
          be modified or withdrawn at any time without prior notice.
        </p>

        <h2>Taxes</h2>
        <p>
          Prices include applicable taxes as per Indian law. Any additional
          duties or charges, if applicable, shall be borne by the customer.
        </p>

        <h2>Payment</h2>
        <p>
          Full payment is required before shipment. We support secure payment
          methods including debit cards, credit cards, UPI, and other online
          payment options shown during checkout.
        </p>

        <h2>Shipping</h2>
        <p>
          Available shipping options and estimated delivery timelines will be
          shown at checkout. Delivery timelines are estimates and may vary due
          to factors beyond our control. StyleIn shall not be held liable for
          delays caused by logistics partners or unforeseen circumstances.
        </p>

        <p>
          Risk of loss or damage transfers to the customer upon successful
          delivery. In case of damaged or missing items, please contact our
          support team immediately.
        </p>

        <h2>Returns</h2>
        <p>
          Returns are accepted in accordance with our Return Policy. Products
          must be unused, unwashed, and returned in original packaging within
          the specified return window. Return shipping costs may apply unless
          stated otherwise.
        </p>

        <h2>Warranty</h2>
        <p>
          Warranty details, if applicable, will be mentioned on the product page
          or provided with the item. StyleIn does not offer warranties beyond
          those explicitly stated.
        </p>

        <h2>Not for Resale</h2>
        <p>
          Products purchased from StyleIn are intended for personal use only.
          Unauthorized resale or commercial use is strictly prohibited.
        </p>

        <h2>Governing Law / Jurisdiction</h2>
        <p>
          These Terms shall be governed and interpreted in accordance with the
          laws of India. Any disputes shall be subject to the jurisdiction of
          Indian courts.
        </p>

        <h2>Dispute Resolution</h2>
        <p>
          Any disputes arising out of or related to these Terms shall be
          resolved amicably. If unresolved, disputes shall be subject to
          arbitration or legal proceedings as per applicable Indian laws.
        </p>

        <h2>Indemnification</h2>
        <p>
          You agree to indemnify and hold StyleIn harmless from any claims,
          damages, losses, or expenses arising from misuse of the website or
          violation of these Terms.
        </p>

        <h2>Entire Agreement</h2>
        <p>
          These Terms constitute the entire agreement between you and StyleIn
          and supersede any prior agreements or communications.
        </p>

        <h2>Contact Information</h2>
        <p>If you have any questions regarding these Terms, please contact us:</p>

        <p style={{ fontWeight: "500" }}>StyleIn</p>
        <p style={{ fontWeight: "500" }}>India</p>
        <p style={{ fontWeight: "500" }}>
          Email:{" "}
          <span style={{ fontWeight: "400" }}>support@stylein.com</span>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
