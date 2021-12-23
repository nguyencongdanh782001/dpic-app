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

const PhotoForm = ({
  user,
  image,
  openModal,
  handleClickModal,
  handleCloseModal,
  setImage,
  deleteImage,
  onSubmit,
  initialValues,
}) => {
  return (
    <>
      <Tooltip
        placement="right-end"
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
          <AddIcon /> Add photo
        </ButtonAdd>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModal}>
        <ContainerModal>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formikProps) => {
              const { values } = formikProps;
              return (
                <FormModal autoComplete="off">
                  <Title>
                    <Typography variant="h5">NEW PHOTO</Typography>
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
                          name="note"
                          component={InputMik}
                          label="Message"
                          type="text"
                          values={values.note}
                          multiline
                          rows={7}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12} sm={12}>
                          <ImageItem>
                            {image.map((image, index) => (
                              <Fragment key={index}>
                                <Close size="small" onClick={deleteImage}>
                                  <CloseIcon />
                                </Close>
                                <Image
                                  src={URL.createObjectURL(image)}
                                  alt=""
                                  loading="lazy"
                                />
                              </Fragment>
                            ))}
                          </ImageItem>
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
                              accept="image/*"
                              hidden
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
                    Create
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

export default PhotoForm;
