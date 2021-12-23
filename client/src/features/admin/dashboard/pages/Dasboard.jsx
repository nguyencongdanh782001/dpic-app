import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getalluser } from "../../../auth/authSlice";
const Dasboard = () => {
  const alluser = useSelector((state) => state.authReducer.alluser);
  console.log(alluser);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(getalluser());
  }, [dispacth]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userName", headerName: "User name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "Created at", width: 200 },
  ];

  const rows = alluser.map((user, index) => ({
    id: index,
    userName: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">All user</Typography>
      </Grid>
      <Grid item xs={12} sm={11} style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
    </Grid>
  );
};

export default Dasboard;
