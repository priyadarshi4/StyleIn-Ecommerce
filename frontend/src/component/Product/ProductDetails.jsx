import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { IconButton, Input } from "@material-ui/core";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Rating from "@material-ui/lab/Rating";
import Button from "@mui/material/Button";

import {
  generateDiscountedPrice,
  calculateDiscount,
  dispalyMoney,
} from "../DisplayMoney/DisplayMoney";

import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
// import useActive from "../hook/useActive"; // Removed: Replaced with useState
import ReviewCard from "./ReviewCard";
import {
  clearErrors,
  getProductDetails,
  getProduct, // Changed from getProducts to getProduct (assuming this is the action for fetching product list)
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import { addItemToCart } from "../../actions/cartAction";
import CricketBallLoader from "../layouts/loader/Loader";
import ProductCard from "../Home/ProductCard"; // Assuming ProductCard component exists for displaying products

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  // ---------------- STATE ----------------
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [activeIndex, setActiveIndex] = useState(0); // Added: State for active tab index

  // const { handleActive, activeClass } = useActive(0); // Removed: Replaced with useState

  const { product = {}, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { products = [], loading: productsLoading } = useSelector(
    (state) => state.products // Assuming products state has the related products
  );

  // ---------------- SIZE + STOCK LOGIC ----------------
  const isSizeProduct =
    Array.isArray(product?.sizes) &&
    product.sizes.some((s) => Number(s.stock) > 0);

  // Stock depends on size (if any)
  const availableStock =
    isSizeProduct && selectedSize
      ? product.sizes.find((s) => s.size === selectedSize)?.stock ?? 0
      : product.Stock ?? 0;

  // ---------------- PRICE ----------------
  const price = Number(product?.price || 0);
  const finalPrice = generateDiscountedPrice(price);
  const discountedPrice = price - finalPrice;

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setPreviewImg(product.images[0].url);
      setActiveIndex(0); // Updated: Set active index
    }
  }, [product]);

  // Fetch related products when product category is available
  useEffect(() => {
    if (product.category) {
      dispatch(getProduct("", 1, [0, 25000], product.category, 0, 4)); // Changed getProducts to getProduct
    }
  }, [dispatch, product.category]);

  // ---------------- HANDLERS ----------------
  const handleAddItem = () => {
    if (isSizeProduct && !selectedSize) {
      alert.error("Please select a size");
      return;
    }

    if (availableStock <= 0) {
      alert.error("Product is out of stock");
      return;
    }

    dispatch(addItemToCart(id, quantity, selectedSize));
    alert.success("Item added to cart");
  };

  const increaseQuantityHandler = () => {
    if (quantity >= availableStock) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  // ---------------- RENDER ----------------
  if (loading) return <CricketBallLoader />;

  // Filter out the current product from related products
  const relatedProducts = products.filter((p) => p._id !== product._id).slice(0, 4);

  return (
    <>
      <MetaData title={product.name || "Product"} />

      <div className="prodcutDetialsContainer">
        <section id="product_details" className="section">
          <div className="product_container">
            <div className="wrapper prod_details_wrapper">
              {/* LEFT */}
              <div className="prod_details_left_col">
                <div className="prod_details_tabs">
                  {product.images?.map((img, i) => (
                    <div
                      key={i}
                      className={`tabs_item ${activeIndex === i ? 'active' : ''}`} // Updated: Use activeIndex for class
                      onClick={() => {
                        setPreviewImg(img.url);
                        setActiveIndex(i); // Updated: Set active index
                      }}
                    >
                      <img src={img.url} alt="product" />
                    </div>
                  ))}
                </div>

                <figure className="prod_details_img">
                  {/* Render all images with active class for desktop/tablet, all for phone scrolling */}
                  {product.images?.map((img, i) => (
                    <img 
                      key={i} 
                      src={img.url} 
                      alt="product" 
                      className={img.url === previewImg ? 'active' : ''} 
                    />
                  ))}
                </figure>
              </div>

              {/* RIGHT */}
              <div className="prod_details_right_col_001">
                <h1>{product.name}</h1>
                <h4>{product.info}</h4>

                <Rating value={product.ratings || 0} readOnly />

                <div className="prod_details_price">
                  <h2>
                    {dispalyMoney(finalPrice)}{" "}
                    <del>{dispalyMoney(price)}</del>
                  </h2>
                  <p className="saved_price">
                    ..You save {dispalyMoney(discountedPrice)} (
                    {calculateDiscount(discountedPrice, price)}%)
                  </p>
                </div>

                {/* SIZE SELECTOR */}
                {isSizeProduct && (
                  <div className="size-selector">
                    <span className="size-title">Size</span>

                    <div className="size-options">
                      {product.sizes.map((s) => {
                        const isDisabled = s.stock <= 0;
                        const isActive = selectedSize === s.size;

                        return (
                          <button
                            key={s.size}
                            className={`size-box 
                              ${isActive ? "active" : ""} 
                              ${isDisabled ? "disabled" : ""}
                            `}
                            disabled={isDisabled}
                            onClick={() => {
                              setSelectedSize(s.size);
                              setQuantity(1);
                            }}
                          >
                            {s.size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STOCK */}
                <div className="badge">
                  {isSizeProduct && !selectedSize ? (
                    <span className="selectsize">
                      Please select size
                    </span>
                  ) : availableStock > 0 ? (
                    <span className="instock">
                      ✓ In Stock
                    </span>
                  ) : (
                    <span className="outofstock">
                      ✗ Out of Stock
                    </span>
                  )}
                </div>
                <div className="deliveryText">
                  <LocalShippingOutlinedIcon />
                  We deliver! Just say when and how.
                </div>

                {/* CART */}
                <div className="prod_details_additem">
                  <div className="quantity_box">
                    <IconButton onClick={decreaseQuantityHandler}>
                      <RemoveIcon />
                    </IconButton>

                    <Input readOnly value={quantity} />

                    <IconButton onClick={increaseQuantityHandler}>
                      <AddIcon />
                    </IconButton>
                  </div>

                  <Button
                    variant="contained"
                    className="prod_details_addtocart_btn"
                    onClick={handleAddItem}
                    disabled={isSizeProduct && !selectedSize}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related_products_section">
            <h2>Related Products</h2>
            <div className="related_products_container">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </section>
        )}

        {product._id && <ReviewCard product={product} />}
      </div>
    </>
  );
};

export default ProductDetails;