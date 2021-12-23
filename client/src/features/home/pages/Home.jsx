import React, { Fragment, useEffect, useState } from "react";
import { Grid, CircularProgress, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../components/posts/Posts";
import Advertises from "../components/advertises/Advertises";
import { EndPost, GridAds, GridPost } from "./Style";
import { getPosts, likePost, createPost } from "../postsSlice";
import AddPost from "../components/addpost/AddPost";
import { HomeNull } from "../../../constants/Image";
import { getuser } from "../../auth/authSlice";
import { getAdvertise } from "../../admin/advertise/advertiseSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const posts = useSelector((state) => state.postReducer.posts);
  const currentPage = useSelector((state) => state.postReducer.currentPage);
  const totalPage = useSelector((state) => state.postReducer.totalPage);
  const loading = useSelector((state) => state.postReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  const advertise = useSelector((state) => state.advertiseReducer.Advertise);
  const loadingAds = useSelector((state) => state.advertiseReducer.isLoading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAdvertise());
  }, [dispatch]);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const handleLikePost = async (id) => {
    try {
      await dispatch(likePost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    title: "",
    camera: "",
    note: "",
  };

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState([]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const deleteImage = (id) => {
    const img = image.filter((img, index) => index !== id);
    setImage(img);
  };

  const onSubmit = async (value) => {
    const object = { ...value, name: user?.name };
    const formData = Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());
    image.forEach((img) => formData.append("image", img));
    try {
      const data = await dispatch(createPost(formData));
      if (data?.payload) {
        handleCloseModal();
        window.location.reload(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" alignItems="stretch">
        {loading ? (
          <GridPost
            item
            xs={12}
            sm={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </GridPost>
        ) : posts.length > 0 ? (
          <GridPost item xs={12} sm={8}>
            <InfiniteScroll
              dataLength={posts?.length} //This is important field to render the next data
              next={() => setPage((prevPage) => prevPage + 1)}
              hasMore={totalPage > currentPage}
              loader={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    margin: "25px 0px 20px 0px",
                  }}
                >
                  <Typography>
                    <CircularProgress />
                  </Typography>
                </div>
              }
              endMessage={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    margin: "25px 0px 20px 0px",
                  }}
                >
                  <EndPost>
                    <Paper
                      elevation={3}
                      style={{
                        height: "60px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#616161",
                      }}
                    >
                      <Typography variant="h6">
                        You have read all the posts
                      </Typography>
                    </Paper>
                  </EndPost>
                </div>
              }
            >
              <Posts
                posts={posts}
                handleLikePost={handleLikePost}
                user={user}
              />
            </InfiniteScroll>
          </GridPost>
        ) : (
          <GridPost item xs={12} sm={8} style={{ display: "flex" }}>
            <div style={{ margin: "auto" }}>
              <img src={HomeNull} alt="" />
            </div>
          </GridPost>
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
      <AddPost
        initialValues={initialValues}
        user={user}
        image={image}
        setImage={setImage}
        openModal={openModal}
        handleClickModal={handleClickModal}
        handleCloseModal={handleCloseModal}
        deleteImage={deleteImage}
        onSubmit={onSubmit}
      />
    </Fragment>
  );
};

export default Home;
