import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import {
  dispalyMoney,
  generateDiscountedPrice,
  calculateDiscount,
} from "../DisplayMoney/DisplayMoney";

const useStyles = makeStyles((theme) => ({
  roots11: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 2rem",
    width: "fit-content",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
    margin: "1rem 2rem",
    height: "auto",
    borderRadius: "16px",
    border: "1px solid #f0f0f0",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    background: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.2)",
      borderColor: "#e0e0e0",
    },
    animation: "$fadeIn 0.5s ease-in-out",
    [theme.breakpoints.down(899)]: {
      padding: "3rem 3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },
    [theme.breakpoints.down(499)]: {
      padding: "1rem",
      margin: "0.5rem",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e9ecef",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  root11: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 1rem",
    width: "fit-content",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
    margin: "1rem 2rem",
    height: "auto",
    borderRadius: "16px",
    border: "1px solid #f0f0f0",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    background: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.2)",
      borderColor: "#e0e0e0",
    },
    animation: "$fadeIn 0.5s ease-in-out",
    [theme.breakpoints.down(899)]: {
      padding: "3rem",
      margin: "1rem 3rem",
    },
    [theme.breakpoints.down(699)]: {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },
    [theme.breakpoints.down(499)]: {
      padding: "1rem",
      margin: "0.5rem",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e9ecef",
    },
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  media: {
    width: "200px",
    height: "240px",
    marginRight: "16px",
    borderRadius: "12px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down(699)]: {
      width: "35%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(599)]: {
      width: "30%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    [theme.breakpoints.down(499)]: {
      width: "120px",
      height: "120px",
      marginRight: "12px",
      borderRadius: "10px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      flexShrink: 0,
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "fit-content",
    [theme.breakpoints.down(699)]: {
      padding: "0",
      width: "fit-content",
    },
    [theme.breakpoints.down(599)]: {
      padding: "0",
      width: "fit-content",
    },
    [theme.breakpoints.down(499)]: {
      width: "100%",
      flex: 1,
      padding: "0 0.5rem",
    },
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    [theme.breakpoints.down(499)]: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: "0.5rem",
    },
  },
  title: {
    width: "90%",
    fontSize: "1rem",
    fontWeight: 600,
    marginLeft: "1rem",
    color: "#212529",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
      marginLeft: "0",
    },
    "& .MuiTypography-subtitle1 ": {
      [theme.breakpoints.down(599)]: {
        fontSize: "14px",
      },
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "0.9rem",
      margin: "0",
      width: "100%",
      fontWeight: 700,
    },
  },
  priceItem: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
    marginLeft: "1.2rem",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
    [theme.breakpoints.down(499)]: {
      margin: "0.5rem 0",
      gap: "0.5rem",
      alignItems: "center",
    },
  },
  cartSubHeadings: {
    fontSize: "16px",
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#495057",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#28a745",
    [theme.breakpoints.down(599)]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down(499)]: {
      fontSize: "14px",
    },
  },
  itemOldPrice: {
    marginLeft: "-8px",
    fontSize: "14px",
    fontWeight: 400,
    color: "#adb5bd",
    [theme.breakpoints.down(499)]: {
      fontSize: "12px",
    },
  },
  contentBottom: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
    alignItems: "baseline",
    width: "fit-content",
    flexDirection: "column",
    [theme.breakpoints.down(599)]: {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
    [theme.breakpoints.down(550)]: {
      position: "relative",
      marginLeft: "0rem",
    },
    [theme.breakpoints.up(500)]: { // For laptops/PCs/tablets
      width: "100%", // Force full width to ensure visibility
      flexDirection: "row", // Arrange in a row for better space
      justifyContent: "space-between",
      alignItems: "center",
    },
    [theme.breakpoints.down(499)]: {
      width: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: "0.5rem",
      gap: "0.5rem",
    },
  },
  quantityAndRemoveRow: {
    display: "none",
    [theme.breakpoints.down(499)]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  },
  removeButton: {
    marginTop: "1rem",
    backgroundColor: "#F7931E",
    color: "white",
    borderRadius: "8px",
    padding: "10px 20px",
    fontWeight: 600,
    transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0px 2px 8px rgba(247, 147, 30, 0.3)",
    "&:hover": {
      backgroundColor: "#f78707",
      transform: "scale(1.05)",
      boxShadow: "0px 4px 12px rgba(247, 147, 30, 0.4)",
    },
    [theme.breakpoints.up(500)]: { // For laptops/PCs/tablets
      margin: "0", // Remove top margin
    },
    [theme.breakpoints.down(499)]: {
      margin: "0",
      padding: "8px 12px",
      fontSize: "0.8rem",
      flexShrink: 0,
    },
  },
}));

function CartItem({
  deleteCartItems,
  item,
  decreaseQuantity,
  increaseQuantity,
  length,
}) {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width:499px)');

  // Calculate price after discount
  let finalPrice = generateDiscountedPrice(item.price);
  let originalPrice = item.price;
  let savedAmountNumeric = originalPrice - finalPrice;
  let total = finalPrice * item.quantity;
  total = dispalyMoney(total);
  finalPrice = dispalyMoney(finalPrice);
  let savedAmount = dispalyMoney(savedAmountNumeric);
  originalPrice = dispalyMoney(originalPrice);

  const handleCardClick = () => {
    history.push(`/product/${item.productId}`);
  };

  return (
    <Card
      className={length < 2 ? classes.root11 : classes.roots11}
      onClick={handleCardClick}
    >
      <CardMedia
        className={classes.media}
        image={item.image}
        title={item.name}
      />
      <CardContent className={classes.content}>
        <div className={classes.contentTop}>
          <div className={classes.cartHeader}>
            <Typography variant="subtitle1" className={classes.title}>
              {item.name} {item.size ? `(Size: ${item.size})` : ""}
            </Typography>
          </div>
          <div className={classes.priceItem}>
            <Typography className={classes.cartSubHeadings} variant="body2">
              Price:
            </Typography>
            <Typography variant="subtitle1" className={classes.itemPrice}>
              {finalPrice}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              color="black"
              className={classes.itemOldPrice}
            >
              <del>{originalPrice}</del>
            </Typography>
          </div>
          {/* Add saved amount text like in ProductDetails */}
          <p className="saved_price" style={{ marginLeft: '1.2rem', fontSize: '0.8rem', color: '#6c757d' }}>
            You save {savedAmount} ({calculateDiscount(savedAmountNumeric, item.price)}%)
          </p>
        </div>
        <div className={classes.contentBottom}>
          {!isMobile && (
            <>
              <div className="prod_details_additem">
                <h5>QTY:</h5>
                <div className="additem">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Decreasing quantity for size:", item.size);
                      decreaseQuantity(item.productId, item.size, item.quantity);
                    }}
                    className="additem_decrease"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Input
                    readOnly
                    type="number"
                    value={item.quantity}
                    className="input"
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Increasing quantity for size:", item.size);
                      increaseQuantity(
                        item.productId,
                        item.size,
                        item.quantity,
                        item.stock
                      );
                    }}
                    className="additem_increase"
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Removing item with size:", item.size);
                  deleteCartItems(item.productId, item.size);
                }}
              >
                Remove
              </Button>
            </>
          )}
          <div className={classes.priceItem}>
            <Typography variant="body2" className={classes.cartSubHeadings}>
              TOTAL:
            </Typography>
            <Typography variant="subtitle1" className={classes.itemPrice}>
              {total}
            </Typography>
          </div>
        </div>
        <div className={classes.quantityAndRemoveRow}>
          <div className="prod_details_additem">
            <h5>QTY:</h5>
            <div className="additem">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Decreasing quantity for size:", item.size);
                  decreaseQuantity(item.productId, item.size, item.quantity);
                }}
                className="additem_decrease"
              >
                <RemoveIcon />
              </IconButton>
              <Input
                readOnly
                type="number"
                value={item.quantity}
                className="input"
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Increasing quantity for size:", item.size);
                  increaseQuantity(
                    item.productId,
                    item.size,
                    item.quantity,
                    item.stock
                  );
                }}
                className="additem_increase"
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <Button
            variant="contained"
            className={classes.removeButton}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Removing item with size:", item.size);
              deleteCartItems(item.productId, item.size);
            }}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;