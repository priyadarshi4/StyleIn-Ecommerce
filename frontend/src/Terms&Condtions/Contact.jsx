import React, { useState } from "react";
import {
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MetaData from "../component/layouts/MataData/MataData";
import api from "../utils/axios";

const useStyles = makeStyles((theme) => ({
  root_contactus: {
    padding: "8rem 0",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
  },
  contact_Container_contactus: {
    width: "70%",
    margin: "0 auto",
  },
  title_contact_us: {
    color: "#414141",
    fontSize: "1.5rem !important",
    padding: "1rem 3rem",
    fontFamily: "Roboto",
    fontWeight: "700 !important",
    letterSpacing: "2px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px ",
      padding: "1rem 0",
    },
  },
  divider_contact: {
    width: "90%",
    backgroundColor: "#b6b6b6",
    margin: "2rem 0 !important",
  },
  helpTitle_contact_us: {
    fontSize: "18px",
    color: "black",
    padding: "2rem 0",
  },
  para_contact: {
    paddingBottom: "3rem",
    marginLeft: "0.5rem",
    color: "#414141",
    lineHeight: "1.5rem",
    fontSize: "16px !important",
    width: "90%",
    letterSpacing: "2px",
    [theme.breakpoints.down("sm")] :{
      width : "100%"
    }
  },
  address_contacts: {
    paddingBottom: "3rem",
    marginLeft: "0.5rem",
    color: "#414141",
    lineHeight: "1.5rem",
    fontSize: "16px !important",
    width: "90%",
    letterSpacing: "2px",
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
    },
  },
  supportButton: {
    backgroundColor: "#292929 !important",
    color: "white !important",
    width: "fit-content !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "3.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#F7931E !important",
      color: "white !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "15px !important",
    },
  },
  callButton: {
    backgroundColor: "#292929 !important",
    color: "white   !important",
    width: "fit-content     !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "1.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#F7931E !important",
      color: "white !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.8rem 3.4rem   !important",
    },
  },
  formContainer_container: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  formField_contact: {
  width: "100%",

  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",

    "&.Mui-focused": {
      backgroundColor: "#fff",
    },
  },
},

  submitButtons: {
    alignSelf: "flex-start",
    backgroundColor: "#292929 !important",
    color: "white   !important",
    width: "fit-content     !important",
    padding: "1rem 3rem   !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#F7931E !important",
      color: "white !important",
    },
  },
  SelectOption_contact: {
  width: "100%",
  marginBottom: "2rem",

  /* Input root */
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff !important",
    borderRadius: "4px",

    "& fieldset": {
      borderColor: "#cccccc",
    },

    "&:hover fieldset": {
      borderColor: "#999999",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#999999",
    },

    /* REMOVE blue glow / shadow */
    "&.Mui-focused": {
      backgroundColor: "#ffffff !important",
      boxShadow: "none !important",
    },
  },

  /* Selected text area */
  "& .MuiSelect-select": {
    backgroundColor: "#ffffff !important",
    color: "#000000",
  },

  "& .MuiInputBase-input": {
    backgroundColor: "#ffffff !important",
    color: "#000000",
  },

  /* Remove dark highlight on click */
  "& .MuiSelect-select:focus": {
    backgroundColor: "#ffffff !important",
  },
},

menu_contact: {
  /* Dropdown container */
  "& .MuiPaper-root": {
    backgroundColor: "#ffffff !important",
    color: "#000000",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // light shadow only
  },

  /* Menu items */
  "& .MuiMenuItem-root": {
    backgroundColor: "#ffffff !important",
    color: "#000000 !important",

    "&:hover": {
      backgroundColor: "#f2f2f2 !important",
    },

    "&.Mui-selected": {
      backgroundColor: "#f0f0f0 !important",
      color: "#000000 !important",
    },

    "&.Mui-selected:hover": {
      backgroundColor: "#e6e6e6 !important",
    },

    /* Remove focus-visible dark overlay */
    "&.Mui-focusVisible": {
      backgroundColor: "#ffffff !important",
    },
  },
},


}));
  const ContactForm = () => {
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();
 const [formData, setFormData] = useState({
    issue: "e-commerce",
    detail: "others",
    language: "english",
    email: "",
    message: "",
  });
  const handleCall = () => {
    window.location.href = "tel:+916201088656";
  };
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert.error("Email and message are required");
    return;
  }

  try {
    const { data } = await api.post(
      "/api/v1/contact",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.success) {
      alert.success("Support request sent successfully!");

      // ✅ RESET FORM
      setFormData({
        issue: "e-commerce",
        detail: "others",
        language: "english",
        email: "",
        message: "",
      });

      history.push("/");
    } else {
      alert.error(data.message || "Failed to send message");
    }
  } catch (error) {
    alert.error(
      error.response?.data?.message ||
      "Server error. Please try again later."
    );
  }
};

  
  return (
    <Box className={classes.root_contactus}>
      <MetaData  title={"Contact Us"}/>
      <div className={classes.contact_Container_contactus}>
        <Typography variant="h2" className={classes.title_contact_us}>
          Contact Us
        </Typography>

        <Divider className={classes.divider_contact} />

        <Typography variant="h4" className={classes.helpTitle_contact_us}>
          Need Help?
        </Typography>

        <Typography variant="body2" className={classes.para_contact}>
          We have live chat available, look for the chat icon in the lower right
          hand corner of this page. If it isn’t there, then give us a call at{" "}
          <strong
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleCall}
          >
            6201088656
          </strong>
          .
        </Typography>

        <Typography variant="body2" className={classes.para_contact}>
          <span className={classes.para2}>7:00-6:00 MST Monday-Friday</span>
          <br />
          <span className={classes.para2}>9:00-4:00 MST Saturday</span>
          <br />
          <span className={classes.para2}>Closed Sunday</span>
        </Typography>

        <Typography variant="body2" className={classes.para_contact}>
          Catch us outside these hours? Fill out our support form below, and
          we'll be in touch shortly.
        </Typography>

        <Typography variant="body2" className={classes.address_contacts}>
          <span style={{ fontWeight: "500", paddingBottom: "0.5rem" }}>
            StyleIn Store, Pvt Ltd.
          </span>
          <br />
          IIT-Patna
          <br />
          Bihar
          <br />
          India
        </Typography>

        <div className={classes.buttonGroup}>
          <a href="#issue-select" style={{ textDecoration: "none" }}>
            <Button variant="contained" className={classes.supportButton}>
              Support Form
            </Button>
          </a>

          <Button
            variant="contained"
            className={classes.callButton}
            onClick={handleCall}
          >
            Call Us
          </Button>
        </div>

        <Divider className={classes.divider_contact} />
        <div className={classes.supportForm}>
          <Typography
            variant="h4"
            className={classes.title_contact_us}
            style={{ paddingBottom: "1rem" }}
          >
            Support Form
          </Typography>

          <Typography variant="body2" className={classes.para_contact}>
            Need a quicker answer? Look for our chat icon on the right hand side
            of this page.
          </Typography>

          <form
  className={classes.formContainer_container}
  onSubmit={handleSubmit}
>
  {/* ISSUE */}
  <div className={classes.SelectOption_contact}>
  <Typography variant="body2" className={classes.lableText_contact}>
    ISSUE *
  </Typography>
  <FormControl className={classes.formField_contact}>
    <Select
      name="issue"
      value={formData.issue}
      onChange={handleChange}
      MenuProps={{
        PaperProps: {
          className: classes.menu_contact,
        },
      }}
    >
      <MenuItem value="e-commerce">E-Commerce</MenuItem>
      <MenuItem value="app">App</MenuItem>
    </Select>
  </FormControl>
</div>

{/* DETAIL */}
<div className={classes.SelectOption_contact}>
  <Typography variant="body2" className={classes.lableText_contact}>
    DETAIL *
  </Typography>
  <FormControl className={classes.formField_contact}>
    <Select
      name="detail"
      value={formData.detail}
      onChange={handleChange}
      MenuProps={{
        PaperProps: {
          className: classes.menu_contact,
        },
      }}
    >
      <MenuItem value="availability">Availability</MenuItem>
      <MenuItem value="return/exchange">Return / Exchange</MenuItem>
      <MenuItem value="technical-support">Technical Support</MenuItem>
      <MenuItem value="invoicing">Invoicing</MenuItem>
      <MenuItem value="tracking-info">Tracking Info</MenuItem>
      <MenuItem value="others">Others</MenuItem>
    </Select>
  </FormControl>
</div>

{/* LANGUAGE */}
<div className={classes.SelectOption_contact}>
  <Typography variant="body2" className={classes.lableText_contact}>
    Language *
  </Typography>
  <FormControl className={classes.formField_contact}>
    <Select
      name="language"
      value={formData.language}
      onChange={handleChange}
      MenuProps={{
        PaperProps: {
          className: classes.menu_contact,
        },
      }}
    >
      <MenuItem value="english">English</MenuItem>
      <MenuItem value="hindi">Hindi</MenuItem>
      <MenuItem value="japanese">Japanese</MenuItem>
      <MenuItem value="chinese">Chinese</MenuItem>
      <MenuItem value="german">German</MenuItem>
    </Select>
  </FormControl>
</div>

{/* EMAIL */}
<div className={classes.SelectOption_contact}>
  <Typography variant="body2" className={classes.lableText_contact}>
    EMAIL *
  </Typography>
  <FormControl className={classes.formField_contact}>
    <TextField
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter Your Email *"
      type="email"
      required
    />
  </FormControl>
</div>

{/* MESSAGE */}
<div className={classes.SelectOption_contact}>
  <Typography variant="body2" className={classes.lableText_contact}>
    MESSAGE *
  </Typography>
  <FormControl className={classes.formField_contact}>
    <TextField
      name="message"
      value={formData.message}
      onChange={handleChange}
      multiline
      rows={6}
      variant="outlined"
      placeholder="Enter Your Message *"
      required
    />
  </FormControl>
</div>

{/* SUBMIT */}
<Button
  type="submit"
  variant="contained"
  className={classes.submitButtons}
>
  Submit
</Button>

</form>

        </div>
      </div>
    </Box>
  );
}


export default ContactForm;
