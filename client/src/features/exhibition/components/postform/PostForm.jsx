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
import InputMik from "../../../../customs/inputmik/InputMik";
import * as yup from "yup";
const PostForm = ({
  user,
  image,
  openModal,
  handleClickModal,
  handleCloseModal,
  setImage,
  deleteImage,
  onSubmit,
  initialValues,
  error,
}) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("This field is required"),
    camera: yup.string().required("This field is required"),
  });

  return (
    <>
      <Tooltip
        disabled={!user?.role}
        placement="top-start"
        title="Add"
        aria-label="Add"
        onClick={handleClickModal}
      >
        <ButtonAdd
          disabled={!user?.role}
          variant="contained"
          color="primary"
          size="small"
        >
          <AddIcon /> Add post
        </ButtonAdd>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModal}>
        <ContainerModal>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              const { values } = formikProps;
              return (
                <FormModal autoComplete="off">
                  <Title>
                    <Typography variant="h5">NEW POST</Typography>
                  </Title>
                  <Close color="inherit" onClick={handleCloseModal}>
                    <CloseIcon />
                  </Close>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2}>
                        <FastField
                          name="title"
                          component={InputMik}
                          label="Title"
                          type="text"
                          values={values.title}
                          autoFocus
                        />
                        <FastField
                          name="camera"
                          component={InputMik}
                          label="Camera"
                          values={values.camera}
                          type="text"
                        />
                        <FastField
                          name="note"
                          component={InputMik}
                          label="Message"
                          type="text"
                          values={values.note}
                          multiline
                          rows={5}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12} sm={12}>
                          <ImageItem error={error} image={image}>
                            {image.map((img, index) => (
                              <Fragment key={index}>
                                <Close size="small" onClick={deleteImage}>
                                  <CloseIcon />
                                </Close>
                                <Image src={URL.createObjectURL(img)} alt="" />
                              </Fragment>
                            ))}
                          </ImageItem>

                          {image.length > 0
                            ? ""
                            : error !== null && (
                                <Typography
                                  variant="caption"
                                  style={{
                                    color: "#d32f2f",
                                    position: "relative",
                                    top: -10,
                                    left: 15,
                                    fontSize: "12px",
                                  }}
                                >
                                  {error}
                                </Typography>
                              )}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Button
                            disabled={image.length > 0 ? true : false}
                            fullWidth
                            variant="outlined"
                            component="label"
                          >
                            <PhotoCamera /> &nbsp; Upload
                            <input
                              name="image"
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) =>
                                setImage([...image, ...e.target.files])
                              }
                            />
                          </Button>
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
                    Post
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

export default PostForm;
