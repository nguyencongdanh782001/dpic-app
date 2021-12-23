import { Grid, Modal, Tooltip, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import {
  ButtonSubmit,
  ContainerModal,
  FormModal,
  Title,
  Close,
  ButtonAdd,
} from "./Style";
import CloseIcon from "@mui/icons-material/Close";
import { FastField, Formik } from "formik";
import InputMik from "../../../../../customs/inputmik/InputMik";

const NotifyForm = ({
  currentId,
  user,
  openModal,
  handleClickModal,
  handleCloseModal,
  onSubmit,
  initialValues,
}) => {
  const validationSchema = yup.object().shape({
    message: yup.string().required("This field is required"),
  });
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
          <AddIcon /> Add notify
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
                    <Typography variant="h5">
                      {currentId ? "EDIT NOTIFY" : "NEW NOTIFY"}
                    </Typography>
                  </Title>
                  <Close color="inherit" onClick={handleCloseModal}>
                    <CloseIcon />
                  </Close>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <FastField
                          name="message"
                          component={InputMik}
                          label="Notify"
                          type="text"
                          values={values.message}
                          autoFocus
                          multiline
                          rows={11}
                        />
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

export default NotifyForm;
