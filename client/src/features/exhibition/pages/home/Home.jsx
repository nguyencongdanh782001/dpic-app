import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import { getExhibition } from "../../../admin/exhibition/exhibitionSlice";
import { getuser } from "../../../auth/authSlice";
import { getExhPosts, likeExhPost } from "../../exhibitonPostSlice";
import AllPostsItem from './allpostsitem/AllPostsItem'
import { CloseExhibition, ExhibitionNull } from "../../../../constants/Image";
import {Link} from 'react-router-dom'
const Home = () => {
  const exhibition = useSelector((state) => state.exhibitionReducer.Exhibition);
  const loading = useSelector((state) => state.exhibitionReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  const posts = useSelector((state) => state.exhibitionPostReducer.ExhPosts);
  const loadingPosts = useSelector(
    (state) => state.exhibitionPostReducer.isLoading
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExhibition());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getExhPosts());
  }, [dispatch]);

  const exhposts = posts.filter((posts) => posts.approve === true);

  const handleLikePost = async (id) => {
    try {
      await dispatch(likeExhPost(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
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
      ) : exhibition?.length > 0 ? (
        <>
          <Grid item xs={12}>
            {exhibition.map((exh, index) => (
              <div key={index} style={{display:'flex', position:'relative', padding:"0px 10px 10px 15px"}}>
                <div>
                  <Typography variant="h6">{exh.title}</Typography>
                  <Typography variant="caption">
                    <Moment format="DD/MM/YYYY">{exh.daystart}</Moment>
                  </Typography>
                  &nbsp;-&nbsp;
                  <Typography variant="caption">
                    <Moment format="DD/MM/YYYY">{exh.dayend}</Moment>
                  </Typography>
                </div>
              </div>
            ))}
          </Grid>
          {loadingPosts ? (
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress style={{ margin: "auto" }} />
            </Grid>
          ) : (
            <>
              {exhposts?.length > 0 ? (
                exhposts.map((exhposts, index) => (
                  <Grid item xs={11} sm={9} lg={7} key={index}>
                    <AllPostsItem
                      exhposts={exhposts}
                      user={user}
                      handleLikePost={handleLikePost}
                    />
                  </Grid>
                ))
              ) : (
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img src={ExhibitionNull} alt="" />
                    </div>
                    <Typography
                      style={{
                        marginTop: "20px",
                        fontSize: "23px",
                        color: "#757575",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      The exhibition has no posts, join at&nbsp;<Link to="/exhibition/newpost">here</Link>
                    </Typography>
                  </div>
                </Grid>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={CloseExhibition} alt="" />
              </div>
              <Typography
                style={{
                  marginTop: "20px",
                  fontSize: "23px",
                  color: "#757575",
                  textAlign: "center",
                }}
              >
                Exhibition close
              </Typography>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Home;
