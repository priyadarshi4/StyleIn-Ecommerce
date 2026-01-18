import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { useRouteMatch, Link } from "react-router-dom";  // Added Link for navigation
import MetaData from "../layouts/MataData/MataData";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import cartImage from "../../Image/cart/vecteezy_product-not-found-illustration-in-modern-flat-style-ideal_68705309-removebg-preview.png"; 

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme, useMediaQuery } from "@mui/material"; // Added for mobile detection

const categories = [
  "All", // Added "All" category
  "Watches",
  "Jackets",
  "T-Shirts",
  "Shirts",
  "Sports Wear",
  "Jeans",
  "Footwear",
  "Headphones / Earbuds",
  "Smart Watches",
  "Power Banks",
  "Cameras",
  "Accessories (chargers, cables)",
  "Cricket / Football Gear",
];

function Products() {
  const match = useRouteMatch();
  let keyword = match.params.keyword;
  const dispatch = useDispatch();
  const {
    products,
    loading,
    productsCount,
    error,
    resultPerPage,
    // filterdProductCount,
  } = useSelector((state) => state.products);
  const alert = useAlert();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile

  const [currentPage, setCurrentPage] = React.useState(1);  // Initialized to 1
  const [price, setPrice] = React.useState([0, 100000]);
  const [category, setCategory] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("All"); // Default to "All"
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, currentPage, price, ratings, category]);

  const setCurrentPageNoHandler = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "All") {
      setCategory(""); // Reset category to show all products
    } else {
      setCategory(selectedCategory);
    }
    setSelectedCategory(selectedCategory);
  };

  const [selectedRating, setSelectedRating] = React.useState("all");

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
    setSelectedRating(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS --Ecart" />
          {!products || products.length === 0 ? (  // Fixed syntax: removed invalid '==='
            <>
                <div
                className="emptyCartContainer "
                style={{ marginTop: "5rem", background: "white" }}
              >
                <img src={cartImage} alt="Cart Icon" className="cartIcon" />

                <Typography variant="h5" component="h1" className="cartHeading">
                  Product Not Found
                </Typography>
                <Typography variant="body" className="cartText">
                  Nothin' to see here.
                </Typography>
                <Typography variant="body" className="cartText">
                  There is no product with this name
                </Typography>

                <Button
                  className="shopNowButton"
                  onClick={() => window.location.reload()}
                  style={{ width: "7rem" }}
                >
                  Refresh
                </Button>
              </div>
            </>
          ) : (
            <div className="productPage">
              {/* Categories at the top, horizontal sliding */}
              <div className="topCategories">
                <Typography
                  style={{
                    fontSize: "18px",
                    padding: "10px",
                    fontWeight: 700,
                    color: "#414141",
                    textAlign: "center",
                  }}
                >
                  Categories
                </Typography>
                <div className="horizontalCategoryBox">
                  {categories.map((category, index) => (
                    <label
                      key={index}
                      className="horizontalCategoryLabel"
                      htmlFor={`category-${index}`}
                    >
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        className="category-checkbox"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="prodcutPageTop">
                {/* Pagination above filterBox for mobile */}
                {isMobile && productsCount > resultPerPage && (
                  <div className="paginationBoxMobile">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNoHandler}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="First"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}

                {/* Mobile Filters - Price and Ratings outside box */}
                {isMobile && (
                  <div className="mobileFilters">
                    {/* Price */}
                    <div className="priceFilter">
                      <Typography
                        style={{
                          fontSize: "18px",
                          padding: "5px",
                          fontWeight: 700,
                          color: "#414141",
                        }}
                      >
                        Price
                      </Typography>
                      <div className="priceSlider">
                        <Slider
                          value={price}
                          onChange={priceHandler}
                          min={0}
                          max={100000}
                          step={100}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                        />
                      </div>
                      <div className="priceSelectors">
                        <div className="priceSelector">
                          <Select
                            value={price[0]}
                            onChange={(e) =>
                              setPrice([+e.target.value, price[1]])
                            }
                            className="priceOption"
                            IconComponent={ArrowDropDownIcon}
                            renderValue={(selected) =>
                              selected !== "" ? selected : "min"
                            }
                          >
                            <MenuItem value={5000} className="menu_item">
                              5000
                            </MenuItem>
                            <MenuItem value={10000} className="menu_item">
                              10000
                            </MenuItem>
                          </Select>
                          <span className="toText">to</span>
                          <Select
                            value={price[1]}
                            onChange={(e) =>
                              setPrice([price[0], +e.target.value])
                            }
                            className="priceOption"
                            IconComponent={ArrowDropDownIcon}
                            renderValue={(selected) =>
                              selected !== "" ? selected : "max"
                            }
                          >
                            <MenuItem value={50000} className="menu_item">
                              50000
                            </MenuItem>
                            <MenuItem value={20000} className="menu_item">
                              20000
                            </MenuItem>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="filter_divider"></div>

                    {/* Ratings */}
                    <div className="ratingsFilter">
                      <Typography
                        style={{
                          fontSize: "18px",
                          padding: "10px",
                          fontWeight: 700,
                          color: "#414141",
                        }}
                      >
                        Ratings Above
                      </Typography>
                      <RadioGroup
                        value={selectedRating}
                        onChange={handleRatingChange}
                        row
                        className="ratingsBox"
                      >
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4★ & above"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3★ & above"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2★ & above"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                )}

                <div className="filterBox">
                  {/* For mobile, only the styled section is here */}
                  {!isMobile && (
                    <>
                      {/* Price */}
                      <div className="priceFilter">
                        <Typography
                          style={{
                            fontSize: "18px",
                            padding: "5px",
                            fontWeight: 700,
                            color: "#414141",
                          }}
                        >
                          Price
                        </Typography>
                        <div className="priceSlider">
                          <Slider
                            value={price}
                            onChange={priceHandler}
                            min={0}
                            max={100000}
                            step={100}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                          />
                        </div>
                        <div className="priceSelectors">
                          <div className="priceSelector">
                            <Select
                              value={price[0]}
                              onChange={(e) =>
                                setPrice([+e.target.value, price[1]])
                              }
                              className="priceOption"
                              IconComponent={ArrowDropDownIcon}
                              renderValue={(selected) =>
                                selected !== "" ? selected : "min"
                              }
                            >
                              <MenuItem value={5000} className="menu_item">
                                5000
                              </MenuItem>
                              <MenuItem value={10000} className="menu_item">
                                10000
                              </MenuItem>
                            </Select>
                            <span className="toText">to</span>
                            <Select
                              value={price[1]}
                              onChange={(e) =>
                                setPrice([price[0], +e.target.value])
                              }
                              className="priceOption"
                              IconComponent={ArrowDropDownIcon}
                              renderValue={(selected) =>
                                selected !== "" ? selected : "max"
                              }
                            >
                              <MenuItem value={50000} className="menu_item">
                                50000
                              </MenuItem>
                              <MenuItem value={20000} className="menu_item">
                                20000
                              </MenuItem>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="filter_divider"></div>

                      {/* Ratings */}
                      <div className="ratingsFilter">
                        <Typography
                          style={{
                            fontSize: "18px",
                            padding: "10px",
                            fontWeight: 700,
                            color: "#414141",
                          }}
                        >
                          Ratings Above
                        </Typography>
                        <RadioGroup
                          value={selectedRating}
                          onChange={handleRatingChange}
                          row
                          className="ratingsBox"
                        >
                          <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="4★ & above"
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="3★ & above"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="2★ & above"
                          />
                        </RadioGroup>
                      </div>

                      <div className="filter_divider"></div>
                    </>
                  )}

                  {/* Added styled section below ratings for attractiveness and responsiveness */}
                  
                  <div
                    style={{
                      textAlign: "center",
                      margin: "24px 0",
                      fontSize: "clamp(20px, 6vw, 32px)", // smoother responsiveness
                      fontWeight: "800",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      style={{
                        color: "#FF7A00", // Bright Orange
                        textShadow: "0 0 8px rgba(255, 122, 0, 0.8)",
                      }}
                    >
                      Style
                    </span>
                    <span
                      style={{
                        marginLeft: "6px",
                        color: "#0923e6", // Navy Blue
                        textShadow: "0 0 10px rgba(10, 26, 255, 0.8)",
                      }}
                    >
                      In
                    </span>
                  </div>

                </div>
                        
                <div
                  className={products.length < 2 ? "products1" : "products"}
                >
                  {products &&
                    products.map((product) => (
                      <Link key={product._id} to={`/product/${product._id}`}>  {/* Added Link for navigation */}
                        <ProductCard product={product} />
                      </Link>
                    ))}
                </div>
              </div>

              {/* Pagination at bottom for non-mobile */}
              {!isMobile && productsCount > resultPerPage && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNoHandler}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Products;