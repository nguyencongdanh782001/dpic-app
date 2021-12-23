import { Grid, Modal, Typography } from "@mui/material";
import React from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { FastField, Formik } from "formik";
import InputMik from "../../../../customs/inputmik/InputMik";
const DetailPhotoForm = ({
  user,
  image,
  openModal,
  handleClickModal,
  handleCloseModal,
  handleChangeImage,
  deleteImage,
  onSubmit,
  initialValues,
}) => {
  return (
    <>
      <ButtonAdd
        onClick={handleClickModal}
        fullWidth
        variant="contained"
        color="primary"
      >
        Edit photo
      </ButtonAdd>
      <Modal open={openModal} onClose={handleCloseModal}>
        <ContainerModal>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formikProps) => {
              const { values } = formikProps;
              return (
                <FormModal autoComplete="off">
                  <Title>
                    <Typography variant="h5">EDIT PHOTO</Typography>
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
                          {image.map((img, index) => (
                            <ImageItem key={index}>
                              <>
                                <Image src={`${process.env.REACT_APP_API_IMAGE}${img}`} alt="" />
                              </>
                            </ImageItem>
                          ))}
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
                    Confirm
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

export default DetailPhotoForm;
