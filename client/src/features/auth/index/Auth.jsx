import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import AuthSlider from "../components/authslider/AuthSlider";
import Login from "../page/login/Login";
import { GridForm, GridSlider } from "./Style";
import Register from "../page/register/Register";
import { Link, Redirect } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../authSlice";

const Auth = ({ authRoute }) => {
  const user = useSelector((state) => state.authReducer.user);
  const loading = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  let body;

  if (user?.role === "admin") {
    body = (
      <>
        <Redirect to="/admin/dashboard" />
      </>
    );
  } else if (user?.role === "user") {
    body = (
      <>
        <Redirect to="/" />
      </>
    );
  } else {
    body = (
      <>
        {authRoute === "login" && <Login />}
        {authRoute === "register" && <Register />}
      </>
    );
  }

  return loading ? (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <CircularProgress style={{ margin: "auto" }} />
    </div>
  ) : (
    <div>
      <Button
        style={{ marginLeft: "5px" }}
        size="small"
        variant="outlined"
        color="error"
        component={Link}
        to="/home"
      >
        <KeyboardReturnIcon /> &nbsp;Back to Home
      </Button>
      <Grid
        position="static"
        container
        justifyContent="center"
        alignItems="stretch"
      >
        <GridSlider item md={4}>
          <AuthSlider />
        </GridSlider>
        <GridForm item xs={12} sm={12} md={5}>
          {body}
        </GridForm>
      </Grid>
    </div>
  );
};

export default Auth;
