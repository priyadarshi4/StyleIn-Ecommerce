import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import MetaData from "../layouts/MataData/MataData";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailOTP, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./LoginFromStyle";

const VerifyEmail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.userData
  );

  const [otp, setOtp] = useState("");

  // get userId from signup redirect
  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      history.push("/register");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.success("Email verified successfully 🎉");
      history.push("/account");
    }
  }, [error, dispatch, alert, history, isAuthenticated, userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert.error("OTP must be 6 digits");
      return;
    }

    dispatch(verifyEmailOTP(userId, otp));
  };

  return (
    <>
      <MetaData title="Verify Email" />

      <Box
        className={classes.formContainer}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <form className={classes.form} onSubmit={submitHandler}>
          <Typography variant="h5" gutterBottom>
            Verify Your Email
          </Typography>

          <Typography variant="body2" style={{ marginBottom: "1rem" }}>
            Enter the 6-digit OTP sent to your email
          </Typography>

          <TextField
            label="Enter OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{
              maxLength: 6,
              style: { textAlign: "center", fontSize: "1.2rem" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            className={classes.loginButton}
            fullWidth
            disabled={loading}
            style={{ marginTop: "1.5rem" }}
          >
            Verify Email
          </Button>
        </form>
      </Box>
    </>
  );
};

export default VerifyEmail;
