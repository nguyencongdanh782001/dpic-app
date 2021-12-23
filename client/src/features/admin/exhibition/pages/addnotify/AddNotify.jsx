import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "../../../../../constants/Image";
import { getuser } from "../../../../auth/authSlice";
import {
  createNotify,
  deleteNotify,
  getNotify,
  updateNotify,
} from "../../../../exhibition/notifySlice";
import NotifyForm from "../../components/notifyform/NotifyForm";
import NotifyItem from "./notifyitem/NotifyItem";
const AddNotify = () => {
  const notify = useSelector((state) => state.notifyReducer.notify);
  const loading = useSelector((state) => state.notifyReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotify());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const [initialValues, setInitialValues] = useState({
    message: "",
  });
  const [currentId, setCurrentId] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleCurrentId = (id) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  const editValue = currentId
    ? notify.find((category) => category._id === currentId)
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
    setInitialValues({message:""});
  };
  const onSubmit = async (value) => {
    try {
      if (currentId) {
        const data = await dispatch(
          updateNotify({ value: { ...value, name: user?.name }, id: currentId })
        );
        if (data?.payload) {
          setInitialValues({
            message: "",
          });
          setCurrentId("");
          handleCloseModal();
        }
      } else {
        const data = await dispatch(
          createNotify({ ...value, name: user?.name})
        );
        if (data?.payload) {
          setInitialValues({
            message: "",
          });
          handleCloseModal();
          window.location.reload(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
     const data = await dispatch(deleteNotify(id));
     if(data?.payload){
      window.location.reload(false);
     }
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
            <NotifyForm
              currentId={currentId}
              initialValues={initialValues}
              user={user}
              openModal={openModal}
              handleClickModal={handleClickModal}
              handleCloseModal={handleCloseModal}
              onSubmit={onSubmit}
            />
          </Grid>
          {notify.length > 0 ? (
            notify.map((notify, index) => (
              <Grid item xs={12} sm={11} key={index}>
                <NotifyItem
                  notify={notify}
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
                  <img src={Notification} alt="" />
                </div>
                <Typography
                  style={{
                    marginTop: "20px",
                    fontSize: "23px",
                    color: "#757575",
                    textAlign: "center",
                  }}
                >
                  Your notification is too empty,{" "}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickModal}
                  >
                    add notify
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

export default AddNotify;
