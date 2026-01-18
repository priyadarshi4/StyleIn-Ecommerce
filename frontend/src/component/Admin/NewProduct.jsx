import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { createProduct, clearErrors } from "../../actions/productAction";
import { useHistory } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstatns";

import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InfoIcon from "@mui/icons-material/Info";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";

import Navbar from "./Navbar";
import useStyles from "../User/LoginFromStyle";

import {
  Avatar,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@material-ui/core";

function NewProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const { loading, error, success } = useSelector(
    (state) => state.addNewProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isCategory, setIsCategory] = useState(false);
  const [sizes, setSizes] = useState([]);

  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);
  const classes = useStyles();

  const sizeCategories = [
    "T-Shirts",
    "Shirts",
    "Footwear",
    "Jackets",
    "Sports Wear",
    "Jeans",
  ];

  const isSizeRequired = sizeCategories.includes(category);

  const toggleHandler = () => setToggle(!toggle);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
    setSizes([]);
    setStock(0);
  };

  const handleImageUpload = () => fileInputRef.current.click();

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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

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

    images.forEach((img) => {
      myForm.append("images", img);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New Product"} />

          <div className={classes.updateProduct}>
            <div className={!toggle ? classes.firstBox1 : classes.toggleBox1}>
              <Sidebar />
            </div>

            <div className={classes.secondBox1}>
              <Navbar toggleHandler={toggleHandler} />

              <div className={`${classes.formContainer} ${classes.formContainer2}`}>
                <Paper elevation={3} className={classes.formPaper} style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
                  <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                    <Avatar className={classes.avatar}>
                      <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography variant="h4" className={classes.heading} style={{ marginTop: '10px' }}>
                      Create New Product
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
                          label="Product Name"
                          fullWidth
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={classes.textField}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <ShoppingCartOutlinedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Price"
                          type="number"
                          fullWidth
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className={classes.textField}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <AttachMoneyIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Stock"
                          type="number"
                          fullWidth
                          disabled={isSizeRequired}
                          required={!isSizeRequired}
                          value={Stock}
                          onChange={(e) => setStock(e.target.value)}
                          className={classes.textField}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <StorageIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Product Info"
                          fullWidth
                          required
                          value={info}
                          onChange={(e) => setInfo(e.target.value)}
                          className={classes.textField}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <InfoIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth className={classes.formControl}>
                          <InputLabel>Category</InputLabel>
                          <Select value={category} onChange={handleCategoryChange}>
                            <MenuItem value="">Choose Category</MenuItem>
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
                          label="Description"
                          multiline
                          rows={4}
                          fullWidth
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className={classes.descriptionInput}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <DescriptionIcon />
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
                          accept="image/*"
                          multiple
                          hidden
                          ref={fileInputRef}
                          onChange={createProductImagesChange}
                        />
                        <Button
                          variant="contained"
                          onClick={handleImageUpload}
                          startIcon={<CloudUploadIcon />}
                          className={classes.uploadAvatarButton}
                          fullWidth
                        >
                          Upload Images
                        </Button>
                      </Grid>

                      {imagesPreview.length > 0 && (
                        <Grid item xs={12}>
                          <Box mt={2}>
                            <Typography variant="subtitle1" gutterBottom>
                              Image Previews
                            </Typography>
                            <Grid container spacing={2}>
                              {imagesPreview.map((img, i) => (
                                <Grid item xs={6} sm={4} md={3} key={i}>
                                  <Box
                                    style={{
                                      border: '1px solid #ddd',
                                      borderRadius: '8px',
                                      overflow: 'hidden',
                                      padding: '5px',
                                    }}
                                  >
                                    <img
                                      src={img}
                                      alt="Preview"
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
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.loginButton}
                            disabled={loading}
                            size="large"
                          >
                            Create Product
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

export default NewProduct;