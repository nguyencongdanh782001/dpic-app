import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhotoForm from "../../components/photoform/PhotoForm";
import { createPhoto, getPhotos, deletePhoto } from "../../PhotosSlice";
import AllImageItem from "./allimageItem/AllImageItem";
import { EmptyImage, EmptyLogin } from "../../../../constants/Image";
import { getuser } from "../../../auth/authSlice";

const AllImage = () => {
  const photos = useSelector((state) => state.photosReducer.libPhotos);
  const loading = useSelector((state) => state.photosReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  const loadingUser = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const [initialValues, setInitialValues] = useState({
    title: "",
    note: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState([]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setImage([]);
    setInitialValues({
      title: "",
      note: "",
    });
    setOpenModal(false);
  };

  const deleteImage = () => {
    setImage([]);
  };

  const onSubmit = async (value) => {
    const object = { ...value, category: "null" };
    const formData = Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());
    image.forEach((img) => formData.append("image", img));
    try {
      const data = await dispatch(createPhoto(formData));
      if (data?.payload) {
        setImage([]);
        setInitialValues({
          title: "",
          note: "",
        });
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handledeletePhoto = async (id) => {
    try {
      await dispatch(deletePhoto(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Grid
        container
        justifyContent="start"
        alignItems="stretch"
        spacing={{ xs: 2, sm: 3 }}
      >
        {loadingUser ? (
          <Grid
            item
            xs={12}
            sm={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CircularProgress style={{ margin: "auto" }} />
          </Grid>
        ) : user?.role ? (
          loading ? (
            <Grid
              item
              xs={12}
              sm={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress style={{ margin: "auto" }} />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={12}>
                <PhotoForm
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
              {photos.length > 0 ? (
                photos.map((photos, index) => (
                  <Grid item xs={4} sm={4} lg={3} key={index}>
                    <AllImageItem
                      photos={photos}
                      handledeletePhoto={handledeletePhoto}
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
                      <img src={EmptyImage} alt="" />
                    </div>
                    <Typography
                      style={{
                        marginTop: "20px",
                        fontSize: "23px",
                        color: "#757575",
                        textAlign: "center",
                      }}
                    >
                      Your photos is too empty,{" "}
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleClickModal}
                      >
                        add photos
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
            xs={12}
            sm={12}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
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
                Login to add photos
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AllImage;
