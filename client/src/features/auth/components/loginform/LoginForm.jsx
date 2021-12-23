import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CameraEnhanceOutlinedIcon from "@mui/icons-material/CameraEnhanceOutlined";
import InputField from "../../../../customs/inputFields/InputField";
import {
  AvataForm,
  ButtonSubmit,
  ContainerForm,
  FormData,
  PaperForm,
  PaperSignUp,
} from "./Style";
import { Link } from "react-router-dom";

const LoginForm = ({ control, handleSubmit, errors, onSubmit, loginFail }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowpassword = () => {
    setShowPassword((preventShowpassword) => !preventShowpassword);
  };
  return (
    <ContainerForm component="main" maxWidth="sm">
      <PaperForm elevation={2}>
        <AvataForm>
          <CameraEnhanceOutlinedIcon />
        </AvataForm>
        <Typography variant="h5">Sign In</Typography>
        <FormData autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {loginFail && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  &ensp; {loginFail}
                </Typography>
              </Grid>
            )}
            <InputField
              control={control}
              name="email"
              label="Email"
              error={errors}
              type="email"
              autoFocus
            />
            <InputField
              control={control}
              name="password"
              label="Password"
              error={errors}
              type={showPassword ? "text" : "password"}
              handleShowpassword={handleShowpassword}
            />
          </Grid>
          <ButtonSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </ButtonSubmit>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button color="inherit">Forgot password?</Button>
          </div>
        </FormData>
      </PaperForm>
      <PaperSignUp elevation={2}>
        <Typography>
          Don't have an account?{" "}
          <Button component={Link} to="/register">
            Sign Up
          </Button>
        </Typography>
      </PaperSignUp>
    </ContainerForm>
  );
};

export default LoginForm;
