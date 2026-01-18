import React, { useState } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GooglePlay from "../../../Image/Footer/google-play-black.svg";
import AppStore from "../../../Image/Footer/app-store-black.svg";
import "./Footer.css";

const footMenu = [
  {
    id: 1,
    title: "Help",
    menu: [
      { id: 1, link: "Track Order", path: "/orders" },
      { id: 2, link: "FAQs", path: "/terms/conditions" },
      { id: 3, link: "Cancel Order", path: "/policy/return" },
      { id: 4, link: "Return Order", path: "/policy/return" },
      { id: 5, link: "Warranty Info", path: "/policy/Terms" },
    ],
  },
  {
    id: 2,
    title: "Policies",
    menu: [
      { id: 1, link: "Return Policy", path: "/policy/return" },
      { id: 2, link: "Security", path: "/policy/privacy" },
      { id: 3, link: "Sitemap", path: "/policy/Terms" },
      { id: 4, link: "Privacy Policy", path: "/policy/privacy" },
      { id: 5, link: "Terms & Conditions", path: "/terms/conditions" },
    ],
  },
  {
    id: 3,
    title: "Company",
    menu: [
      { id: 1, link: "About Us", path: "/about" },
      { id: 2, link: "Contact Us", path: "/contact" },
      { id: 3, link: "Service Centres", path: "/" },
      { id: 4, link: "Careers", path: "/" },
      { id: 5, link: "Affiliates", path: "/terms/conditions" },
    ],
  },
];

const footSocial = [
  {
    id: 1,
    icon: <FacebookIcon className="social-icon facebook-icon" fontSize="large" />,
    path: "https://www.facebook.com/",
  },
  {
    id: 2,
    icon: <TwitterIcon className="social-icon twitter-icon" fontSize="large" />,
    path: "https://twitter.com/",
  },
  {
    id: 3,
    icon: <InstagramIcon className="social-icon insta-icon" fontSize="large" />,
    path: "https://www.instagram.com/stylein/",
  },
  {
    id: 4,
    icon: <LinkedInIcon className="social-icon linked-icon" fontSize="large" />,
    path: "https://www.linkedin.com/",
  },
];

const Footer = () => {
  const [subValue, setSubValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubValue("");
    alert("Thank you for subscribing to StyleIn updates!");
  };

  const currYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrapper">
          {/* Logo & Newsletter */}
          <div className="footer-about">
            <div className="footer-logo">
              <Link to="/" className="footer-logo-link">
                <img
                  src={require("../../../Image/Footer/logo.png")}
                  alt="StyleIn Logo"
                  className="footer-logo-img"
                />
              </Link>
            </div>

            <div className="footer-style-in">
              <span className="style-text">Style</span>
              <span className="in-text">In</span>
            </div>

            <div className="footer-newsletter">
              <h5>Newsletter</h5>
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Email Address*"
                  required
                  value={subValue}
                  onChange={(e) => setSubValue(e.target.value)}
                />
                <p>
                  By subscribing, you agree to our{" "}
                  <Link to="/terms/conditions" className="newsletter-link">
                    Terms & Conditions
                  </Link>
                </p>
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Menus */}
          <div className="footer-menu-container">
            {footMenu.map(({ id, title, menu }) => (
              <div className="footer-menu" key={id}>
                <h4>{title}</h4>
                <ul>
                  {menu.map(({ id, link, path }) => (
                    <li key={id}>
                      <Link to={path} className="footer-link">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* App & Social */}
          <div className="footer-links">
            <div className="footer-apps">
              <h5>Download App</h5>
              <div className="app-links">
                <a href="/" className="app-link google-play">
                  <img src={GooglePlay} alt="Google Play" />
                </a>
                <a href="/" className="app-link app-store">
                  <img src={AppStore} alt="App Store" />
                </a>
              </div>
            </div>

            <div className="footer-social">
              {footSocial.map(({ id, icon, path }) => (
                <a
                  key={id}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-separator"></div>

      {/* Bottom Bar */}
      <div className="sub-footer">
        <div className="container">
          <div className="sub-footer-wrapper">
            <div className="footer-policies">
              <ul>
                <li>
                  <Link to="/policy/privacy" className="policy-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms/conditions" className="policy-link">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/policy/Terms" className="policy-link">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-copyright">
              <p>
                © {currYear} StyleIn. All Rights Reserved.{" "}
                <a
                  href="https://github.com/priyadarshi4"
                  target="_blank"
                  rel="noreferrer"
                  className="copyright-link"
                >
                  Priyadarshi Prince
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
