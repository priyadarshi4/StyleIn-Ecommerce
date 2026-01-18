import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import Sidebar from "./Siderbar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
import { useHistory } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstatns";
import { useRouteMatch } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import Select from "@material-ui/core/Select";
import InfoIcon from "@mui/icons-material/Info";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import Navbar from "./Navbar";
import useStyles from "../User/LoginFromStyle";

function UpdateProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const classes = useStyles();
  const productId = useRouteMatch().params.id;
  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState('');
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);
  const productLoaded = useRef(false);
  const fetched = useRef(false);

  const sizeCategories = [
    "T-Shirts",
    "Shirts",
    "Footwear",
    "Jackets",
    "Sports Wear",
    "Jeans",
  ];

  const isSizeRequired = sizeCategories.includes(category);

  const categories = [
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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
    setSizes([]);
    setStock(0);
  };

  const handleSizeChange = (size, stock) => {
    setSizes((prev) => {
      const exists = prev.find((s) => s.size === size);
      if (exists) {
        return prev.map((s) =>
          s.size === size ? { size, stock: Number(stock) } : s
        );
      }
      return [...prev, { size, stock: Number(stock) }];
    });
  };

  // Fetch product details on mount or when productId changes
  useEffect(() => {
    if (!fetched.current) {
      dispatch(getProductDetails(productId));
      fetched.current = true;
    }
  }, [dispatch, productId]);

  // Populate form fields when product is loaded
  useEffect(() => {
    if (product && !productLoaded.current) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setInfo(product.info);
      setStock(product.Stock);
      setOldImages(product.images);
      if (product.sizes) {
        setSizes(product.sizes);
      }
      productLoaded.current = true;
    }
  }, [product]);

  // Handle product details error
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  // Handle update error
  useEffect(() => {
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, updateError]);

  // Handle successful update
  useEffect(() => {
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [alert, dispatch, history, isUpdated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    if (isSizeRequired && sizes.length === 0) {
      alert.error("Please add stock for at least one size");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("info", info);

    if (isSizeRequired) {
      myForm.set("sizes", JSON.stringify(sizes));
      myForm.set("Stock", 0);
    } else {
      myForm.set("Stock", Stock);
    }

    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(updateProduct(productId, myForm));
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Product" />
          <div className={classes.updateProduct}>
            <div
              className={
                !toggle ? `${classes.firstBox1}` : `${classes.toggleBox1}`
              }
            >
              <Sidebar />
            </div>
            <div className={classes.secondBox1}>
              <div className={classes.navBar1}>
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <div
                className={`${classes.formContainer} ${classes.formContainer2}`}
              >
                <Paper elevation={3} className={classes.formPaper} style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
                  <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                    <Avatar className={classes.avatar}>
                      <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography variant="h4" className={classes.heading} style={{ marginTop: '10px' }}>
                      Update Product
                    </Typography>
                  </Box>

                  <form
                    className={`${classes.form} ${classes.form2}`}
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                  >
                    <Grid container spacing={4}>
                      {/* Basic Information Section */}
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          Basic Information
                        </Typography>
                        <Divider />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          className={classes.textField}
                          label="Product Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <ShoppingCartOutlinedIcon
                                  style={{
                                    fontSize: 20,
                                    color: "#414141",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          variant="outlined"
                          label="Price"
                          value={price}
                          required
                          fullWidth
                          className={classes.textField}
                          onChange={(e) => setPrice(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                style={{
                                  fontSize: 20,
                                  color: "#414141",
                                }}
                              >
                                <AttachMoneyIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          variant="outlined"
                          label="Stock"
                          value={Stock}
                          required={!isSizeRequired}
                          disabled={isSizeRequired}
                          fullWidth
                          className={classes.textField}
                          onChange={(e) => setStock(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                style={{
                                  fontSize: 20,
                                  color: "#414141",
                                }}
                              >
                                <StorageIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          variant="outlined"
                          label="Product Info"
                          value={info}
                          required
                          fullWidth
                          className={classes.textField}
                          onChange={(e) => setInfo(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                style={{
                                  fontSize: 20,
                                  color: "#414141",
                                }}
                              >
                                <InfoIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth className={classes.formControl}>
                          <InputLabel>Category</InputLabel>
                          <Select
                            variant="outlined"
                            value={category}
                            onChange={handleCategoryChange}
                            className={classes.select}
                            inputProps={{
                              name: "category",
                              id: "category-select",
                            }}
                            MenuProps={{
                              classes: {
                                paper: classes.menu,
                              },
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            <MenuItem value="">
                              <em>Choose Category</em>
                            </MenuItem>
                            {categories.map((cate) => (
                              <MenuItem key={cate} value={cate}>
                                {cate}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Size Wise Stock Section */}
                      {isSizeRequired && (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                              Size Wise Stock
                            </Typography>
                            <Divider />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              {(category === "Footwear"
                                ? ["6", "7", "8", "9", "10"]
                                : ["S", "M", "L", "XL", "XXL"]
                              ).map((size) => (
                                <Grid item xs={12} sm={6} md={4} key={size}>
                                  <TextField
                                    label={`Stock for ${size}`}
                                    type="number"
                                    fullWidth
                                    className={classes.textField}
                                    value={sizes.find((s) => s.size === size)?.stock || ""}
                                    onChange={(e) =>
                                      handleSizeChange(size, e.target.value)
                                    }
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </>
                      )}

                      {/* Description Section */}
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                          Description
                        </Typography>
                        <Divider />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          className={classes.descriptionInput}
                          label="Product Description"
                          multiline
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <DescriptionIcon
                                  className={classes.descriptionIcon}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Images Section */}
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                          Images
                        </Typography>
                        <Divider />
                      </Grid>

                      <Grid item xs={12}>
                        <input
                          type="file"
                          name="avatar"
                          className={classes.input}
                          accept="image/*"
                          onChange={updateProductImagesChange}
                          multiple
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                        <Button
                          variant="contained"
                          color="default"
                          className={classes.uploadAvatarButton}
                          startIcon={
                            <CloudUploadIcon
                              style={{
                                color: "#FFFFFF",
                              }}
                            />
                          }
                          onClick={handleImageUpload}
                          fullWidth
                        >
                          <p className={classes.uploadAvatarText}>
                            Upload Images
                          </p>
                        </Button>
                      </Grid>

                      {imagesPreview.length > 0 ? (
                        <Grid item xs={12}>
                          <Box mt={2}>
                            <Typography variant="subtitle1" gutterBottom>
                              New Image Previews
                            </Typography>
                            <Grid container spacing={2}>
                              {imagesPreview.map((image, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                  <Box
                                    style={{
                                      border: '1px solid #ddd',
                                      borderRadius: '8px',
                                      overflow: 'hidden',
                                      padding: '5px',
                                    }}
                                  >
                                    <img
                                      src={image}
                                      alt="Product Preview"
                                      style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                      }}
                                    />
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <Box mt={2}>
                            <Typography variant="subtitle1" gutterBottom>
                              Current Images
                            </Typography>
                            <Grid container spacing={2}>
                              {oldImages &&
                                oldImages.map((image, index) => (
                                  <Grid item xs={6} sm={4} md={3} key={index}>
                                    <Box
                                      style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        padding: '5px',
                                      }}
                                    >
                                      <img
                                        src={image.url}
                                        alt="Old Product Preview"
                                        style={{
                                          width: '100%',
                                          height: 'auto',
                                          maxHeight: '150px',
                                          objectFit: 'cover',
                                          borderRadius: '4px',
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                ))}
                            </Grid>
                          </Box>
                        </Grid>
                      )}

                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <Box mt={4}>
                          <Button
                            variant="contained"
                            className={classes.loginButton}
                            fullWidth
                            type="submit"
                            disabled={loading}
                            size="large"
                          >
                            Update Product
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateProduct;