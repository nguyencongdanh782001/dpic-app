import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../features/auth/authSlice";
import { Route, Redirect } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import AdminNavBar from "../components/adminnavbar/AdminNavBar";

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.authReducer.user);
  const loading = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div style={{ width: "100%", height: "100%", display: "flex" }}>
            <CircularProgress style={{ margin: "auto" }} />
          </div>
        ) : user?.role === "admin" ? (
          <Grid container justifyContent="center">
            <Grid item sm={3}>
              <AdminNavBar />
            </Grid>
            <Grid item xs={11} sm={9} style={{paddingTop:'80px'}}>
              <Component {...rest} {...props} />
            </Grid>
          </Grid>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRouteAdmin;
