import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyLogin, EmptyPost } from "../../../../constants/Image";
import { getuser } from "../../../auth/authSlice";
import PostForm from "../../components/postform/PostForm";
import {
  createExhPosts,
  deleteExhPost,
  getPrivateExhPosts,
  likeExhPost,
} from "../../exhibitonPostSlice";
import AllPostsItem from "./allpostsitem/AllPostsItem";

const NewPost = () => {
  const exhposts = useSelector((state) => state.exhibitionPostReducer.ExhPosts);
  const loading = useSelector((state) => state.exhibitionPostReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  const loadingUser = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPrivateExhPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const handleLikePost = async (id) => {
    try {
      await dispatch(likeExhPost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await dispatch(deleteExhPost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
    camera: "",
    note: "",
  });
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState([]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setInitialValues({
      title: "",
      camera: "",
      note: "",
    });
    setImage([]);
  };

  const deleteImage = () => {
    setImage([]);
  };

  const onSubmit = async (value) => {
    if (image.length < 1) {
      setError("Image is required");
    } else {
      const object = { ...value, image: image, name: user?.name };
      const formData = Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
      image.forEach((img) => formData.append("image", img));
      try {
        const data = await dispatch(createExhPosts(formData));
        if (data?.payload) {
          setInitialValues({
            title: "",
            camera: "",
            note: "",
          });
          setImage([]);
          handleCloseModal();
          window.location.reload(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="stretch" spacing={3}>
        {loadingUser ? (
          <Grid item xs={11} sm={8} style={{ display: "flex" }}>
            <CircularProgress style={{ margin: "auto" }} />
          </Grid>
        ) : user?.role ? (
          loading ? (
            <Grid item xs={11} sm={8} style={{ display: "flex" }}>
              <CircularProgress style={{ margin: "auto" }} />
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <PostForm
                  error={error}
                  initialValues={initialValues}
                  user={user}
                  image={image}
                  openModal={openModal}
                  handleClickModal={handleClickModal}
                  handleCloseModal={handleCloseModal}
                  setImage={setImage}
                  deleteImage={deleteImage}
                  onSubmit={onSubmit}
                />
              </Grid>
              {exhposts?.length > 0 ? (
                exhposts.map((exhposts, index) => (
                  <Grid item xs={11} sm={9} lg={7} key={index}>
                    <AllPostsItem
                      exhposts={exhposts}
                      user={user}
                      handleLikePost={handleLikePost}
                      handleDeletePost={handleDeletePost}
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
                        add post
                      </Button>
                    </Typography>
                  </div>
                </Grid>
              )}
            </>
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
    </>
  );
};

export default NewPost;
