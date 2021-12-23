import { Button, CircularProgress, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerImage,
  Image,
  ImageItem,
  Message,
  Time,
  Title,
} from "./Style";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePhoto, getPhotos, updatePhoto } from "../../PhotosSlice";
import { EmptyPhoto } from "../../../../constants/Image";
import DetailPhotoForm from "../../components/detailphotoform/DetailPhotoForm";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import moment from "moment";

const DetailImage = () => {
  const { id } = useParams();
  const photos = useSelector((state) => state.photosReducer.libPhotos);
  const loading = useSelector((state) => state.photosReducer.isLoading);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const detailPhoto = photos.find((photo) => photo._id === id);

  const [initialValues, setinitialValues] = useState({
    title: "",
    note: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    if (detailPhoto) {
      setinitialValues(detailPhoto);
      setImage(detailPhoto.image);
    }
  }, [detailPhoto]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleChangeImage = (value) => {
    setImage(value);
  };

  const deleteImage = () => {
    setImage("");
  };

  const onSubmit = async (value) => {
    try {
      const data = await dispatch(
        updatePhoto({ value: { ...value, image: image }, id: detailPhoto?._id })
      );
      if (data.payload) {
        handleCloseModal();
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePhoto = async (id) => {
    try {
      const data = await dispatch(deletePhoto(id));
      if (data.payload) {
        history.push("/library/photos");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container container justifyContent="center">
      {loading ? (
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
          <Grid
            item
            xs={12}
            style={{ marginBottom: "15px", marginLeft: "10px" }}
          >
            <Button
              color="error"
              variant="outlined"
              size="small"
              component={Link}
              to="/library/photos"
            >
              <KeyboardReturnOutlinedIcon />
              &nbsp;Back
            </Button>
          </Grid>
          {detailPhoto ? (
            <Paper elevation={2} style={{ width: "90%", height: "100%" }}>
              <ContainerImage container justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <ImageItem>
                    {detailPhoto?.image.map((img, index) => (
                      <Image key={index} src={`${process.env.REACT_APP_API_IMAGE}${img}`} alt="" />
                    ))}
                  </ImageItem>
                </Grid>
                <Grid item xs={10} sm={5}>
                  {detailPhoto.title ? (
                    <Title variant="h6">Title: {detailPhoto?.title}</Title>
                  ) : (
                    ""
                  )}
                  <Time variant="caption">
                    {moment(detailPhoto?.createAt).fromNow()}
                  </Time>
                  {detailPhoto.note ? (
                    <Message variant="body1">
                      Message: {detailPhoto?.note}
                    </Message>
                  ) : (
                    ""
                  )}
                  <DetailPhotoForm
                    initialValues={initialValues}
                    image={image}
                    openModal={openModal}
                    handleClickModal={handleClickModal}
                    handleCloseModal={handleCloseModal}
                    handleChangeImage={handleChangeImage}
                    deleteImage={deleteImage}
                    onSubmit={onSubmit}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={handleDeletePhoto?.bind(this, detailPhoto._id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </ContainerImage>
            </Paper>
          ) : (
            <Grid item xs={9} sm={4}>
              <img src={EmptyPhoto} alt="" />
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default DetailImage;
