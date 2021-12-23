import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApproveNull } from "../../../../../constants/Image";
import {
  deleteExhPost,
  getExhPosts,
  updateExhPost,
} from "../../../../exhibition/exhibitonPostSlice";
import AllPostsItem from './allpostsitem/AllPostsItem'

const ApprovePost = () => {
  const posts = useSelector((state) => state.exhibitionPostReducer.ExhPosts);
  const loading = useSelector((state) => state.exhibitionPostReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExhPosts());
  }, [dispatch]);
  const approvePosts = posts.filter(posts => posts.approve === false)
  const handleDeletePost = async (id) => {
    try {
      await dispatch(deleteExhPost(id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleApprove = async (id) => {
      try {
        await dispatch(updateExhPost({value:{approve: true},id: id}));
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <Grid container justifyContent="center" spacing={3}>
      {loading ? (
        <Grid item xs={12} sm={8} style={{ display: "flex" }}>
          <CircularProgress style={{ margin: "auto" }} />
        </Grid>
      ) : approvePosts?.length > 0 ? (
        approvePosts.map((posts, index) => (
          <Grid item xs={11} sm={8} key={index}>
            <AllPostsItem posts={posts} handleDeletePost={handleDeletePost} handleApprove={handleApprove}/>
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={11}
          sm={8}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={ApproveNull} alt="" />
            </div>
            <Typography
              style={{
                marginTop: "20px",
                fontSize: "23px",
                color: "#757575",
                textAlign: "center",
              }}
            >
               Empty post
            </Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default ApprovePost;
