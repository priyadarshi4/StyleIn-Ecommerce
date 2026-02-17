import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({

  /* CARD CONTAINER */
  rootPayment: {
  width: "100%",
  display: "flex",
  gap: "14px",
  padding: "12px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  boxSizing: "border-box",
  minWidth: 0,

  [theme.breakpoints.down("sm")]: {
    borderRadius: "14px",
    width: "100%",
  },
},


  /* PRODUCT IMAGE */
  image: {
    width: "120px",
    height: "130px",
    objectFit: "contain",
    background: "#f7f7f7",
    borderRadius: "10px",
    padding: "6px",
    flexShrink: 0,

    [theme.breakpoints.down("sm")]: {
      width: "95px",
      height: "105px",
    },
  },

  /* TEXT SIDE */
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0, // ⭐ prevents overflow
  },

  /* TITLE */
  productName: {
    fontWeight: 600,
    fontSize: "15px",
    marginBottom: "6px",
    lineHeight: 1.3,
    wordBreak: "break-word",

    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },

  /* META INFO */
  quantity: {
    fontSize: 13,
    marginBottom: "6px",
    color: "#666",
  },

  /* PRICE ROW */
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "4px",
  },

  finalPrice: {
    fontWeight: 700,
    fontSize: 15,
  },

  discountPrice: {
    textDecoration: "line-through",
    color: "#888",
    fontSize: 13,
  },

  /* PAYMENT STATUS */
  paymentStatus: {
    marginTop: "auto",
    fontSize: 13,
    fontWeight: 600,
    color: "green",
  },

  paymentValue: {
    fontWeight: 400,
    marginRight: "6px",
    color: "#777",
  },

}));

const OrderDetailsSection = ({ item, totalDiscount, totalPrice }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootPayment}>
      <img src={item.image} alt={item.name} className={classes.image} />

      <div className={classes.details}>
        <Typography className={classes.productName}>
          {item.name}
          {item.size && (
            <span style={{ fontSize: "12px", color: "#555" }}>
              {" "} | Size: <b>{item.size}</b>
            </span>
          )}
        </Typography>

        <Typography className={classes.quantity}>
          Qty: {item.quantity}
        </Typography>

        <div className={classes.priceContainer}>
          <Typography className={classes.finalPrice}>
            {totalPrice}
          </Typography>
          <Typography className={classes.discountPrice}>
            {totalDiscount}
          </Typography>
        </div>

        <Typography className={classes.paymentStatus}>
          <span className={classes.paymentValue}>Payment:</span>
          {item.paymentInfo?.status === "Cash on Delivery"
            ? "Cash on Delivery"
            : item.paymentInfo?.status === "succeeded"
            ? "Online Payment"
            : "Pending"}
        </Typography>
      </div>
    </div>
  );
};

export default OrderDetailsSection;
