import { Button, Grid, Modal, Tooltip, Typography } from "@mui/material";
import React, { Fragment } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  ButtonSubmit,
  ContainerModal,
  FormModal,
  Title,
  Image,
  ImageItem,
  Close,
  ButtonAdd,
} from "./Style";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import { FastField, Formik } from "formik";
import InputMik from "../../../../../customs/inputmik/InputMik";
import * as yup from "yup";

const AdvertiseForm = ({
  image,
  openModal,
  handleClickModal,
  handleCloseModal,
  setImage,
  deleteImage,
  onSubmit,
  initialValues,
  currentId,
  advertise,
}) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    link: yup.string().required("This field is required"),
  });
  return (
    <>
      <Tooltip
        placement="right-end"
        title="Add"
        aria-label="Add"
        onClick={handleClickModal}
      >
        <ButtonAdd variant="contained" color="primary" size="small" disabled={advertise.length > 1 ? true : false}>
          <AddIcon /> Add advertise
        </ButtonAdd>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModal}>
        <ContainerModal>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => {
              const { values } = formikProps;
              return (
                <FormModal autoComplete="off">
                  <Title>
                    <Typography variant="h5">
                      {currentId ? "EDIT ADVERTISE" : "NEW ADVERTISE"}
                    </Typography>
                  </Title>
                  <Close color="inherit" onClick={handleCloseModal}>
                    <CloseIcon />
                  </Close>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2}>
                        <FastField
                          name="name"
                          component={InputMik}
                          label="Name company"
                          type="text"
                          values={values.name}
                          autoFocus
                        />
                        <FastField
                          name="link"
                          component={InputMik}
                          label="Link"
                          type="text"
                          values={values.link}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12} sm={12}>
                          <ImageItem>
                            {image.map((img, index) => (
                              <Fragment key={index}>
                                {!currentId && (
                                  <Close size="small" onClick={deleteImage}>
                                    <CloseIcon />
                                  </Close>
                                )}
                                <Image src={currentId ? img : URL.createObjectURL(img)} alt="" />
                              </Fragment>
                            ))}
                          </ImageItem>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          {!currentId && (
                            <Button
                              fullWidth
                              disabled={image.length > 0 ? true : false}
                              variant="outlined"
                              component="label"
                            >
                              <PhotoCamera /> &nbsp; Upload
                              <input
                                name="image"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) =>
                                  setImage([...image, ...e.target.files])
                                }
                              />
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <ButtonSubmit
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    {currentId ? "Confirm" : "Create"}
                  </ButtonSubmit>
                </FormModal>
              );
            }}
          </Formik>
        </ContainerModal>
      </Modal>
    </>
  );
};

export default AdvertiseForm;
