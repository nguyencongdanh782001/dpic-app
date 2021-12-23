import { Button, Grid, Modal, Tooltip, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  ButtonSubmit,
  ContainerModal,
  FabAdd,
  FormModal,
  Title,
  Image,
  ImageItem,
  Close,
  List,
} from "./Style";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import { FastField, Formik } from "formik";
import InputMik from "../../../../customs/inputmik/InputMik";
import * as yup from "yup";

const AddPost = ({
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
        <FabAdd color="primary">
          <AddIcon />
        </FabAdd>
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
                          multiline
                          values={values.note}
                          rows={5}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12} sm={12}>
                          <List
                            sx={{ width: "100%", height: 209 }}
                            cols={2}
                            rowHeight={130}
                          >
                            {image.map((image, index) => (
                              <ImageItem key={index}>
                                <Close
                                  size="small"
                                  onClick={deleteImage.bind(this, index)}
                                >
                                  <CloseIcon />
                                </Close>
                                <Image
                                  src={URL.createObjectURL(image)}
                                  alt=""
                                  loading="lazy"
                                />
                              </ImageItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Button
                            fullWidth
                            variant="outlined"
                            component="label"
                          >
                            <PhotoCamera /> &nbsp; Upload
                            <input
                              name="image"
                              type="file"
                              multiple
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

export default AddPost;
