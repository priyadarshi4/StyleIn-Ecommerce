import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "./ProductCard";
import MataData from "../layouts/MataData/MataData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import HeroSlider from "./HeroSilder";
import FeaturedSlider from "./FeatureSlider";
import shuffleArray from "../../utils/shuffleArray";

import promoBanner from "../../Image/Cricket-wepon/WhatsApp Image 2026-01-17 at 06.54.59.jpeg";
import SpinWheel from "./SpinWheel/SpinWheel";


// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const SectionHeading = ({ title, subtitle }) => (
  <motion.div
    className="section_heading"
    variants={headingVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
  >
    <h2 className="heading_title">{title}</h2>
    {subtitle && <p className="heading_subtitle">{subtitle}</p>}
    <div className="heading_line">
      <span className="line_accent"></span>
    </div>
  </motion.div>
);

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  /* ===============================
     RANDOMIZE PRODUCTS (KEY LOGIC)
     =============================== */
  const shuffledProducts = products ? shuffleArray(products) : [];

  const featuredProducts = shuffledProducts.slice(0, 8);
  const trendingProducts = shuffledProducts.slice(0,8);
  // Shuffle products every refresh


// Pick any 4 products for promo section
const promoProducts = shuffledProducts.slice(0, 4);



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MataData title="Cricket Weapon - Premium Cricket Equipment" />

          <div className="Home_Page">
            {/* HERO SECTION */}
            <motion.div
              className="heroSlider_Home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSlider />
            </motion.div>

            {/* FEATURED PRODUCTS */}
            <motion.section
              className="featured_section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading
                title="Featured Products"
                subtitle="Discover our top-rated Products"
              />

              {featuredProducts.length > 0 && (
                <FeaturedSlider products={featuredProducts} />
              )}
            </motion.section>

            {/* TRENDING PRODUCTS */}
            <motion.section
              className="trending_section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading
                title="Trending Products"
                subtitle="Popular picks loved by our customers"
              />

              <motion.div
                className="trending-products"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {trendingProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </motion.div>

              {/* MORE PRODUCTS BUTTON */}
              <div className="moreProductsWrapper">
                <Link to="/products">
                  <button className="moreProductsBtn">
                    More Products
                  </button>
                </Link>
              </div>
            </motion.section>
            {/* PROMOTIONAL CATEGORY SECTION */}
              <motion.section
                className="promo_section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="promo_container">

                            {/* LEFT CATEGORY GRID */}
            <div className="promo_left">
              {promoProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="promo_card promo_image_only"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                  />

                  {/* EXCITING OVERLAY TEXT */}
                  <span className="promo_badge">
                    Hot Deal 🔥
                  </span>
                </Link>
              ))}
              <div>
      {/* Your other home page content here */}
      <SpinWheel /> {/* Add this line to render the wheel */}
    </div>
            </div>



                  {/* RIGHT BIG BANNER */}
                    <div className="promo_right">
                      <img
                        src={promoBanner}
                        alt="Top Selling Smartphones"
                      />
                      <div className="promo_overlay">
                        <h2>Top Selling Fashion Brand</h2>
                        <p>Latest and Best Brands</p>
                        <Link to="/products">
                          <button>Explore Now →</button>
                        </Link>
                      </div>
                    </div>


                </div>
              </motion.section>
              {/* COLOR SPLIT CTA SECTION */}
<section className="color_split_section">
  <div className="color_split_container">

    {/* LEFT – TOP PICKS */}
    <div className="color_box top_pick">
      <h2>Top Picks For You ⭐</h2>
      <p>Hand-selected products just for you</p>
      <Link to="/products">
        <button>Explore Products →</button>
      </Link>
    </div>

    {/* RIGHT – HOT DEAL */}
    <div className="color_box hot_deal">
      <h2>Hot Deals 🔥</h2>
      <p>Limited-time offers you can’t miss</p>
      <Link to="/products">
        <button>Explore Products →</button>
      </Link>
    </div>

  </div>
</section>
{/* STYLE IN HERO SECTION */}
<section className="stylein_hero">
  <div className="stylein_container">

    {/* LEFT CONTENT */}
    <div className="stylein_left">
      <h3>Upgrade Your Look ✨</h3>
      <p>
        Discover handpicked trends, premium quality, and styles
        that define you. Don’t just wear it — own it.
      </p>
      <Link to="/products">
        <button>Explore Products →</button>
      </Link>
    </div>

    {/* RIGHT BIG TEXT */}
    <div className="stylein_right">
      <h1>
        <span className="style_word">Style</span>{" "}
        <span className="in_word">In</span>
      </h1>
    </div>

  </div>
</section>

          </div>
        </>
      )}
    </>
  );
}

export default Home;
