import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { EmptyImage, EmptyPhoto } from "../../../../constants/Image";
import { getCategories } from "../../CategoriesSlice";
import { createPhoto, deletePhoto, getPhotos } from "../../PhotosSlice";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import PhotoForm from "../../components/photoform/PhotoForm";
import AllImageItem from "../allimage/allimageItem/AllImageItem";
import { Buttonheader } from "./Style";
import { getuser } from "../../../auth/authSlice";

const DetailCategory = () => {
  const user = useSelector((state) => state.authReducer.user);
  const loadingUser = useSelector((state) => state.authReducer.isLoading);
  const { id } = useParams();
  const categories = useSelector(
    (state) => state.categoriesReducer.LibCategories
  );
  const photos = useSelector((state) => state.photosReducer.libPhotos);
  const cateloading = useSelector((state) => state.categoriesReducer.isLoading);
  const photoloading = useSelector((state) => state.photosReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const detailCategories = categories.find((category) => category._id === id);
  const detailPhotos = photos.filter((photo) => photo.category === id);

  const [initialValues, setInitialValues] = useState({
    title: "",
    note: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState([]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setImage([]);
    setInitialValues({
      title: "",
      note: "",
    });
  };

  const deleteImage = () => {
    setImage([]);
  };

  const onSubmit = async (value) => {
    const object = { ...value, category: id };
    const formData = Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());
    image.forEach((img) => formData.append("image", img));
    try {
      const data = await dispatch(
        createPhoto(formData)
      );
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
    <Grid
      container
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={3}
    >
      {loadingUser ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress style={{ margin: "auto" }} />
        </Grid>
      ) : cateloading ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress style={{ margin: "auto" }} />
        </Grid>
      ) : detailCategories ? (
        <>
          <Grid
            item
            xs={12}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Buttonheader>
              <Button
                color="error"
                variant="outlined"
                size="small"
                component={Link}
                to="/library/category"
              >
                <KeyboardReturnOutlinedIcon />
                &nbsp;Back
              </Button>
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
            </Buttonheader>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ margin: "-5px 0px -5px 10px", color: "#757575" }}
          >
            <Typography variant="h6">
              Category: {detailCategories.name}
            </Typography>
            <Divider />
          </Grid>
          {photoloading ? (
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress style={{ margin: "auto" }} />
            </Grid>
          ) : detailPhotos.length > 0 ? (
            detailPhotos.map((photos, index) => (
              <Grid item xs={4} sm={4} lg={3} key={index}>
                <AllImageItem
                  category={id}
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
      ) : (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={EmptyPhoto} alt="" />
        </Grid>
      )}
    </Grid>
  );
};

export default DetailCategory;
