import React, { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import {
  Container,
  GridContainer,
  GridItem,
  Image,
  Left,
  Right,
} from "./Style";
import { Badge, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotify, seenNotify } from "../../notifySlice";
import { getuser } from "../../../auth/authSlice";
import { getAdvertise } from "../../../admin/advertise/advertiseSlice";

const SlideBar = () => {
  const notify = useSelector((state) => state.notifyReducer.notify);
  const user = useSelector((state) => state.authReducer.user);
  const advertise = useSelector((state) => state.advertiseReducer.Advertise);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdvertise());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNotify());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const unread = notify.filter(
    (tb) => tb.seen.find((seen) => seen === user._id) !== user._id
  );
  const length = unread.length;

  const handleseen = async () => {
    try {
      await unread.map((unread) => dispatch(seenNotify(unread._id)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GridContainer container>
      <GridItem item md={12} component={Link} to="/exhibition">
        <HomeOutlinedIcon fontSize="large" /> &nbsp; Home
      </GridItem>
      {user?.role ? (
        <>
          <GridItem
            onClick={handleseen}
            item
            md={12}
            component={Link}
            to="/exhibition/notify"
          >
            <Badge badgeContent={length > 9 ? "9+" : length} color="error">
              <NotificationsNoneOutlinedIcon fontSize="large" />
            </Badge>
            &nbsp; Notify
          </GridItem>
        </>
      ) : (
        <>
          <GridItem item md={12} component={Link} to="/exhibition/notify">
            <NotificationsNoneOutlinedIcon fontSize="large" />
            &nbsp; Notify
          </GridItem>
        </>
      )}

      <GridItem item md={12} component={Link} to="/exhibition/newpost">
        <AddBusinessOutlinedIcon fontSize="large" /> &nbsp; New Post
      </GridItem>
      <Grid style={{ margin: " 10px 0 10px 0" }} item md={12}>
        <Divider />
      </Grid>
      <Grid
        item
        md={12}
        style={{ marginBottom: "10px", paddingLeft: "5px", color: "#424242" }}
      >
        <Typography variant="h6">Sponsored by</Typography>
      </Grid>
      {advertise.slice(0, 2).map((advertise, index) => (
        <Grid item xs={12} key={index}>
          <Container href={advertise?.link}>
            <Left>
              {advertise?.image.map((img, index) => (
                <Image
                  key={index}
                  src={`${process.env.REACT_APP_API_IMAGE}${img}`}
                  alt=""
                />
              ))}
            </Left>
            <Right>
              <Typography variant="h6">{advertise?.name}</Typography>
              <Typography variant="caption">
                {advertise?.link?.length > 25
                  ? `${advertise?.link.substring(0, 22)}...`
                  : advertise?.link}
              </Typography>
            </Right>
          </Container>
        </Grid>
      ))}
    </GridContainer>
  );
};

export default SlideBar;
