import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
const InputField = ({control, half, multiline, rows, name, label, error, type, autoFocus, handleShowpassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <Controller
                render={({ field }) => (
                    <TextField {...field}
                        fullWidth
                        variant="outlined"
                        type={type}
                        label={label}
                        multiline={multiline ? true : false}
                        rows={rows}
                        autoFocus={autoFocus}
                        error = {error[name] ? true : false}
                        helperText={error[name] ? error[name].message : ''} 
                        InputProps={name === 'password' ? {
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowpassword}>
                                        {type === "password" ? <VisibilityRoundedIcon/> : <VisibilityOffRoundedIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }: null}
                    />
                )}
                control={control}
                name={name}
            />
        </Grid>
    )
}

export default InputField
