import React, { useEffect } from "react";
import ArtTrackOutlinedIcon from "@mui/icons-material/ArtTrackOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PhotoAlbumOutlinedIcon from "@mui/icons-material/PhotoAlbumOutlined";
import {
  Container,
  GridContainer,
  GridItem,
  Image,
  Left,
  Right,
} from "./Style";
import { Divider, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertise } from "../../../admin/advertise/advertiseSlice";

const SlideBar = () => {
  const advertise = useSelector((state) => state.advertiseReducer.Advertise);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdvertise());
  }, [dispatch]);
  return (
    <GridContainer container>
      <GridItem item md={12} component={NavLink} to="/library">
        <ArtTrackOutlinedIcon fontSize="large" /> &nbsp; Posts
      </GridItem>
      <GridItem item md={12} component={NavLink} to="/library/photos">
        <ImageOutlinedIcon fontSize="large" /> &nbsp; Photos
      </GridItem>
      <GridItem item md={12} component={NavLink} to="/library/category">
        <PhotoAlbumOutlinedIcon fontSize="large" /> &nbsp; Category
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
