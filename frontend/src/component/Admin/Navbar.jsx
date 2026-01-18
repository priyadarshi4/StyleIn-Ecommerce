import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 999,
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)", // Subtle gradient for modern look
    width: "100%",
    maxWidth: "1200px", // Reduced max width for a more compact navbar
    margin: "0 auto", // Center the navbar
    padding: "1.5rem 2rem 1rem 2rem", // Increased padding for better spacing
    boxShadow:
      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)", // Softer shadow
    borderBottom: "1px solid #e0e0e0", // Subtle border
    borderRadius: "0 0 10px 10px", // Rounded bottom corners for attractiveness

    [theme.breakpoints.down("999")]: {
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem 1.5rem",
      justifyContent: "space-between", // Ensure space between items
      maxWidth: "100%", // Full width on mobile
    },
    [theme.breakpoints.down("600")]: {
      padding: "1rem",
    },
  },

  menuIcon: {
    display: "none",
    [theme.breakpoints.down("999")]: {
      display: "block",
      fontSize: "2rem",
      "& svg": {
        fontSize: "2rem",
        color: "#414141",
        transition: "color 0.3s, transform 0.3s",
        "&:hover": {
          color: "#F7931E",
          transform: "scale(1.1)", // Smooth hover scale
        },
      },
    },
  },

  logoContainer: {
    flex: 1, // Take up available space to center the logo
    display: "flex",
    flexDirection: "column", // Stack logo and text
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("999")]: {
      flex: "none", // Reset for mobile
      justifyContent: "flex-start", // Align to start on mobile
      flexDirection: "row", // Horizontal on mobile
      alignItems: "center",
    },
  },

  adminPanelText: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#414141",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    [theme.breakpoints.down("999")]: {
      fontSize: "1rem",
      marginBottom: 0,
      marginRight: "0.5rem",
    },
    [theme.breakpoints.down("600")]: {
      fontSize: "0.9rem",
    },
  },

  dashboardHead: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "black",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)", // Subtle hover effect
    },

    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    [theme.breakpoints.down("999")]: {
      fontSize: "1.8rem",
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "1.5rem",
      fontSize: "1.8rem",
    },
  },

  headerBottom__logo_main: {
    height: "4.5rem", // Increased height for bigger logo
    width: "auto",
    maxWidth: "250px", // Increased max width for bigger logo
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)", // Hover effect for logo
    },
    [theme.breakpoints.down("sm")]: {
      height: "3rem", // Adjusted for mobile
    },
    [theme.breakpoints.down("999")]: {
      height: "3.5rem",
    },
  },

  contactButton: {
    padding: "10px 30px",
    borderRadius: "25px", // More rounded for modern look
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Deeper shadow
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    color: "#fff",
    letterSpacing: "1px",
    background: "linear-gradient(135deg, #414141 0%, #333 100%)", // Gradient background
    transition: "all 0.3s ease",
    marginRight: "2rem",
    border: "none",
    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      padding: "8px 20px",
      marginRight: "1rem",
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "14px",
      padding: "8px 25px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },

    "&:hover": {
      background: "linear-gradient(135deg, #F7931E 0%, #e67e22 100%)", // Orange gradient on hover
      transform: "translateY(-2px)", // Lift effect
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
    },
  },
}));

const Navbar = ({ toggleHandler }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <IconButton className={classes.menuIcon} onClick={toggleHandler}>
        <MenuIcon fontSize="2rem" />
      </IconButton>

      <div className={classes.logoContainer}>
        <span className={classes.adminPanelText}>Admin Panel</span>
        <Link
          to="/admin/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={require("../../Image/logo.png")}
            alt="logo"
            className={classes.headerBottom__logo_main}
          />
        </Link>
      </div>

      <Link
        to="/contact"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button className={classes.contactButton}>Contact Us</Button>
      </Link>
    </nav>
  );
};

export default Navbar