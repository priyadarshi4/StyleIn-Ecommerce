import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import { useHistory } from "react-router-dom";

/* ================= STYLES ================= */

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  },

  stepReader: {
    marginTop: "7rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "5rem",
    },
  },

  couponBanner: {
    marginTop: theme.spacing(1),
    padding: "8px 12px",
    background: "#1a1a1a",
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#4dff88",
    fontWeight: 600,
    fontSize: 14,
  },
}));

/* ================= CONNECTOR ================= */

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 10,
  },
  active: {
    "& $line": {
      backgroundColor: "#000000",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#000000",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#dddddd",
    borderRadius: 1,
  },
})(StepConnector);

/* ================= STEP ICON ================= */

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000000",
    zIndex: 1,
    color: "#FFFFFF",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${theme.palette.background.paper}`,
    fontSize: 16,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 22,
      height: 22,
      fontSize: 13,
    },
  },
  active: {
    backgroundColor: "#f0680e",
    boxShadow: "0 4px 10px rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: "#000000",
  },
}));

const ColorlibStepIcon = ({ active, completed, icon, onClick }) => {
  const classes = useColorlibStepIconStyles();

  return (
    <div
      className={`${classes.root} ${active ? classes.active : ""} ${
        completed ? classes.completed : ""
      }`}
      onClick={onClick}
      style={
        !active && !completed
          ? { backgroundColor: "#666", color: "#fff" }
          : null
      }
    >
      {icon}
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const CheckoutSteps = ({ activeStep }) => {
  const classes = useStyles();
  const history = useHistory();
  const [coupon, setCoupon] = useState(null);

  /* 🎟 LOAD SPIN COUPON */
  useEffect(() => {
    const savedCoupon = localStorage.getItem("spin_coupon");
    if (savedCoupon) {
      setCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  const steps = [
    { label: "BAG", icon: "1", link: "/cart" },
    { label: "DELIVERY", icon: "2", link: "/shipping" },
    { label: "PAYMENT", icon: "3", link: "/process/payment" },
    { label: "ORDER COMPLETE", icon: "4", link: "/success" },
  ];

  const handleStepClick = (stepIndex) => {
    if (stepIndex < activeStep) {
      history.push(steps[stepIndex].link);
    }
  };

  return (
    <div className={classes.stepReader}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={(props) => (
                  <ColorlibStepIcon
                    {...props}
                    icon={step.icon}
                    onClick={() => handleStepClick(index)}
                  />
                )}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* 🎟 COUPON INFO */}
        {coupon && activeStep < 3 && (
          <div className={classes.couponBanner}>
            <span>🎟 Coupon Applied</span>
            <span>{coupon.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
