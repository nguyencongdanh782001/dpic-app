import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { SearchNotFound } from "../../../constants/Image";
import { getAdvertise } from "../../admin/advertise/advertiseSlice";
import { getuser } from "../../auth/authSlice";
import Advertises from "../components/advertises/Advertises";
import Posts from "../components/posts/Posts";
import { getPostsBySearch, likePost } from "../searchSlice";
import { GridAds, GridPost } from "./Style";

const Search = () => {
  const posts = useSelector((state) => state.searchReducer.search);
  const currentPage = useSelector((state) => state.searchReducer.currentPage);
  const totalPage = useSelector((state) => state.searchReducer.totalPage);
  const loading = useSelector((state) => state.searchReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  const query = useLocation().search.split("=")[1];
  const advertise = useSelector((state) => state.advertiseReducer.Advertise);
  const loadingAds = useSelector((state) => state.advertiseReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdvertise());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdvertise());
  }, [dispatch]);

  useEffect(() => {
    const data = async () => {
      await dispatch(getPostsBySearch(query));
    };
    data();
  }, [dispatch, query]);

  const handleLikePost = async (id) => {
    try {
      await dispatch(likePost(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" alignItems="stretch">
        {loading ? (
          <GridPost item xs={12} sm={8} style={{ display: "flex" }}>
            <CircularProgress style={{ margin: "auto" }} />
          </GridPost>
        ) : posts.length > 0 ? (
          <>
            <GridPost item xs={12} sm={8}>
              <Posts
                posts={posts}
                handleLikePost={handleLikePost}
                user={user}
              />
            </GridPost>
          </>
        ) : (
          <>
            <GridPost item xs={12} sm={8} style={{ display: "flex" }}>
              <div style={{ margin: "auto" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={SearchNotFound} alt="" />
                </div>
                <Typography
                  variant="h5"
                  style={{
                    margintop: "23px",
                    textAlign: "center",
                    color: "#757575",
                  }}
                >
                  We couldn't find any results for "{query}"
                </Typography>
              </div>
            </GridPost>
          </>
        )}
        {loadingAds ? (
          <GridAds
            item
            sm={4}
            lg={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </GridAds>
        ) : (
          <GridAds item sm={4} lg={3}>
            <Advertises advertise={advertise} />
          </GridAds>
        )}
      </Grid>
    </Fragment>
  );
};

export default Search;
