import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLibPosts,
  deleteLibPost,
  getLibPosts,
  likeLibPost,
  updateLibPost,
} from "../../PostsSlice";
import AllPostsItem from "./AllPostsItem/AllPostsItem";
import PostForm from "../../components/postform/PostForm";
import { EmptyLogin, EmptyPost } from "../../../../constants/Image";
import { getuser } from "../../../auth/authSlice";
const AllPosts = () => {
  const posts = useSelector((state) => state.libPostsReducer.libPosts);
  const loading = useSelector((state) => state.libPostsReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  const loadingUser = useSelector((state) => state.authReducer.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLibPosts());
  }, [dispatch]);

  const handleLikePost = async (id) => {
    try {
      await dispatch(likeLibPost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await dispatch(deleteLibPost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const [currentId, setCurrentId] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    camera: "",
    note: "",
  });
  const handleCurrentId = (id) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  const editPost = currentId
    ? posts.find((post) => post._id === currentId)
    : null;
  useEffect(() => {
    if (editPost) {
      setInitialValues(editPost);
      setImage(editPost.image);
    }
  }, [editPost]);

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState([]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentId("");
    setImage([]);
    setInitialValues({
      title: "",
      camera: "",
      note: "",
    });
  };

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
      if (currentId) {
        const data = await dispatch(
          updateLibPost({
            value: { ...value, image: image, name: user?.name },
            id: currentId,
          })
        );

        if (data?.payload) {
          handleCloseModal();
          setInitialValues({
            title: "",
            camera: "",
            note: "",
          });
          setImage([]);
          setCurrentId("");
        }
      } else {
        const data = await dispatch(
          createLibPosts(formData)
        );
        if (data?.payload) {
          setInitialValues({
            title: "",
            camera: "",
            note: "",
          });
          setImage([]);
          handleCloseModal();
          window.location.reload(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Grid container justifyContent="center" alignItems="stretch" spacing={3}>
        {loadingUser ? (
          <Grid item xs={12} style={{ display: "flex" }}>
            <CircularProgress style={{ margin: "auto" }} />
          </Grid>
        ) : user?.role ? (
          loading ? (
            <Grid item xs={12} style={{ display: "flex" }}>
              <CircularProgress style={{ margin: "auto" }} />
            </Grid>
          ) : posts.length > 0 ? (
            posts.map((posts, index) => (
              <Grid item xs={11} sm={8} md={9} lg={7} key={index}>
                <AllPostsItem
                  posts={posts}
                  user={user}
                  handleLikePost={handleLikePost}
                  handleDeletePost={handleDeletePost}
                  handleCurrentId={handleCurrentId}
                />
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
                  <img src={EmptyPost} alt="" />
                </div>
                <Typography
                  style={{
                    marginTop: "20px",
                    fontSize: "23px",
                    color: "#757575",
                    textAlign: "center",
                  }}
                >
                  Your post is too empty,{" "}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickModal}
                  >
                    add posts
                  </Button>
                </Typography>
              </div>
            </Grid>
          )
        ) : (
          <Grid
            item
            xs={11}
            sm={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <img src={EmptyLogin} alt="" />
              <Typography
                style={{
                  marginTop: "20px",
                  fontSize: "23px",
                  textAlign: "center",
                  color: "#757575",
                }}
              >
                Login to create a posts
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
      <PostForm
        initialValues={initialValues}
        user={user}
        image={image}
        setImage={setImage}
        openModal={openModal}
        handleClickModal={handleClickModal}
        handleCloseModal={handleCloseModal}
        deleteImage={deleteImage}
        onSubmit={onSubmit}
        currentId={currentId}
      />
    </>
  );
};

export default AllPosts;
