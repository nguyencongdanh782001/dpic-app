import { Grid, Modal, Tooltip, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
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

const ExhibitionForm = ({
  currentId,
  openModal,
  handleClickModal,
  handleCloseModal,
  onSubmit,
  initialValues,
  daystart,
  setDaystart,
  dayend,
  setDayend,
  exhibition
}) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("This field is required"),
  });

  return (
    <>
      <Tooltip
        placement="right-end"
        title="Open"
        aria-label="Open"
        onClick={handleClickModal}
      >
        <ButtonAdd
          disabled={exhibition.length >= 1 ? true : false}
          variant="contained"
          color="primary"
          size="small"
        >
          <AddIcon /> Open exhibition
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
                      {currentId ? "EDIT EXHIBITION" : "OPEN EXHIBITION"}
                    </Typography>
                  </Title>
                  <Close color="inherit" onClick={handleCloseModal}>
                    <CloseIcon />
                  </Close>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <FastField
                          name="title"
                          component={InputMik}
                          label="Title"
                          type="text"
                          values={values.title}
                          autoFocus
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Day start"
                          value={daystart}
                          onChange={(newValue) => {
                            setDaystart(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Day end"
                          value={dayend}
                          onChange={(newValue) => {
                            setDayend(newValue);
                          }}
                          
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
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

export default ExhibitionForm;
