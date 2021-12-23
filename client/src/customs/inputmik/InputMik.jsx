import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
const InputMik = ({
  field,
  form,
  label,
  half,
  type,
  multiline,
  rows,
  autoFocus,
  handleShowpassword,
  values,
  placeholder
}) => {
  const { name, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        id={name}
        value={values}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        type={type}
        label={label}
        multiline={multiline ? true : false}
        rows={rows}
        autoFocus={autoFocus}
        error={showError ? true : false}
        helperText={showError ? errors[name] : ''}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowpassword}>
                      {type === "password" ? (
                        <VisibilityRoundedIcon />
                      ) : (
                        <VisibilityOffRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default InputMik;
