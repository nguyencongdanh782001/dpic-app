import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../../../auth/authSlice";

const Account = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ display: "flex" }}>
      <Box
        sx={{
          paddingTop: "24px",
          width: "400px",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Paper elevation={2} sx={{ padding: "15px" }}>
          <div>
            <Typography gutterBottom variant="h6">
              My Profile
            </Typography>
          </div>
          <div style={{ paddingLeft: "8px" }}>
            <Typography gutterBottom>User Name:&emsp; {user.name}</Typography>
            <Typography>Email:&emsp; {user.email}</Typography>
          </div>
        </Paper>
      </Box>
    </Container>
  );
};

export default Account;
