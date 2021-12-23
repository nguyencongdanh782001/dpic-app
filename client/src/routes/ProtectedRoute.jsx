import React, { useEffect } from "react";
import NavBar from "../components/navbar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../features/auth/authSlice";
import { Route, Redirect } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ component: Component, ...rest }) => {
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
        ) : user?.role !== "admin" ? (
          <>
            <NavBar />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
