import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdsNull } from "../../../../constants/Image";

import {
  createAdvertise,
  deleteAdvertise,
  getAdvertise,
  updateAdvertise,
} from "../advertiseSlice";
import AdvertiseForm from "../components/advertiseform/AdvertiseForm";
import AdvertiseItem from "./AdvertiseItem/AdvertiseItem";

const Advertise = () => {
  const advertise = useSelector((state) => state.advertiseReducer.Advertise);
  const loading = useSelector((state) => state.advertiseReducer.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdvertise());
  }, [dispatch]);

  const [initialValues, setInitialValues] = useState({
    name: "",
    link: "",
  });
  const [image, setImage] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleCurrentId = (id) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  const editValue = currentId
    ? advertise.find((advertise) => advertise._id === currentId)
    : null;

  useEffect(() => {
    if (editValue) {
      setInitialValues(editValue);
      setImage(editValue.image);
    }
  }, [editValue]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentId("");
    setImage([]);
    setInitialValues({
      name: "",
      link: "",
    });
  };

  const deleteImage = () => {
    setImage([]);
  };
  const onSubmit = async (value) => {
    const object = { ...value};
    const formData = Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());
    image.forEach((img) => formData.append("image", img));
    try {
      if (currentId) {
        const data = await dispatch(
          updateAdvertise({ value: { ...value, image: image }, id: currentId })
        );
        if (data?.payload) {
          setInitialValues({
            name: "",
            link: "",
          });
          setCurrentId([]);
          handleCloseModal();
        }
      } else {
        const data = await dispatch(
          createAdvertise(formData)
        );
        if (data?.payload) {
          setInitialValues({
            name: "",
            link: "",
          });
          handleCloseModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAdvertise(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container justifyContent="flex-start" alignItems="stretch" spacing={2}>
      {loading ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress style={{ margin: "auto" }} />
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <AdvertiseForm
              initialValues={initialValues}
              image={image}
              openModal={openModal}
              handleClickModal={handleClickModal}
              handleCloseModal={handleCloseModal}
              setImage={setImage}
              deleteImage={deleteImage}
              onSubmit={onSubmit}
              currentId={currentId}
              advertise={advertise}
            />
          </Grid>
          {advertise.length > 0 ? (
            advertise.map((advertise, index) => (
              <Grid item xs={12} sm={5} key={index}>
                <AdvertiseItem
                  advertise={advertise}
                  handleCurrentId={handleCurrentId}
                  handleDelete={handleDelete}
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
                  <img src={AdsNull} alt="" />
                </div>
                <Typography
                  style={{
                    marginTop: "20px",
                    fontSize: "23px",
                    color: "#757575",
                    textAlign: "center",
                  }}
                >
                  Advertise is too empty,{" "}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickModal}
                  >
                    add advertise
                  </Button>
                </Typography>
              </div>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Advertise;
