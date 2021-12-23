import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "../../../../constants/Image";
import { getNotify } from "../../notifySlice";
import NotifyItem from "./notifyitem/NotifyItem";

const Notify = () => {
  const notify = useSelector((state) => state.notifyReducer.notify);
  const loading = useSelector((state) => state.notifyReducer.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotify());
  }, [dispatch]);

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      {loading ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress style={{ margin: "auto" }} />
        </Grid>
      ) : (
        <>
          {notify.length > 0 ? (
            notify.map((notify, index) => (
              <Grid item xs={12} key={index}>
                <NotifyItem
                  notify={notify}
                />
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              sm={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={Notification} alt="" />
                </div>
                <Typography
                  style={{
                    marginTop: "20px",
                    fontSize: "23px",
                    color: "#757575",
                    textAlign: "center",
                  }}
                >
                  No new announcements
                </Typography>
              </div>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Notify;
