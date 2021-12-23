import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyAlbum, EmptyLogin } from "../../../../constants/Image";
import { getuser } from "../../../auth/authSlice";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../CategoriesSlice";
import CategoryForm from "../../components/categoryform/CategoryForm";
import { deletePhoto, getPhotos } from "../../PhotosSlice";
import CategoryItem from "./categoryItem/CategoryItem";

const Category = () => {
  const user = useSelector((state) => state.authReducer.user);
  const loadingUser = useSelector((state) => state.authReducer.isLoading);
  const categories = useSelector(
    (state) => state.categoriesReducer.LibCategories
  );
  const loading = useSelector((state) => state.categoriesReducer.isLoading);
  const photos = useSelector((state) => state.photosReducer.libPhotos);
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
  const [initialValues, setInitialValues] = useState({
    name: "",
  });
  const [currentId, setCurrentId] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleCurrentId = (id) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  const editValue = currentId
    ? categories.find((category) => category._id === currentId)
    : null;

  useEffect(() => {
    if (editValue) {
      setInitialValues(editValue);
    }
  }, [editValue]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentId("");
    setInitialValues({
      name: "",
    });
  };

  const onSubmit = async (value) => {
    try {
      if (currentId) {
        const data = await dispatch(
          updateCategory({ value: value, id: currentId })
        );
        if (data.payload) {
          setInitialValues({
            name: "",
          });
          handleCloseModal();
        }
      } else {
        const data = await dispatch(createCategory(value));
        if (data.payload) {
          setInitialValues({
            name: "",
          });
          handleCloseModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const categoryphoto = photos.filter((photo) => photo.category === id);
    try {
      await categoryphoto.map((ct) => dispatch(deletePhoto(ct._id)));
      await dispatch(deleteCategory(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
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
              <CategoryForm
                currentId={currentId}
                initialValues={initialValues}
                user={user}
                openModal={openModal}
                handleClickModal={handleClickModal}
                handleCloseModal={handleCloseModal}
                onSubmit={onSubmit}
              />
            </Grid>
            {categories.length > 0 ? (
              categories.map((categories, index) => (
                <Grid item xs={4} sm={3} key={index}>
                  <CategoryItem
                    categories={categories}
                    handleCurrentId={handleCurrentId}
                    handleDelete={handleDelete}
                  />
                </Grid>
              ))
            ) : (
              <Grid
                item
                xs={12}
                sm={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={EmptyAlbum} alt="" />
                  </div>
                  <Typography
                    style={{
                      marginTop: "20px",
                      fontSize: "23px",
                      color: "#757575",
                      textAlign: "center",
                    }}
                  >
                    Your categories is too empty,{" "}
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleClickModal}
                    >
                      add categories
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
              Login to add categories
            </Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default Category;
