import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined';
import InputField from '../../../../customs/inputFields/InputField';
import { AvataForm, ButtonSubmit, ContainerForm, FormData, PaperForm } from './Style';
import { Link } from 'react-router-dom';

const RegisterForm = ({control, handleSubmit, errors, onSubmit, registerFail}) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleShowpassword = () => {
        setShowPassword(preventShowpassword => !preventShowpassword)
    }
    return (
        <ContainerForm component="main" maxWidth="sm" >
            <PaperForm elevation={2}>
                <AvataForm>
                    <CameraEnhanceOutlinedIcon/>
                </AvataForm>
                <Typography variant="h5">Sign Up</Typography>
                <FormData autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {registerFail && (
                            <Grid item xs={12}><Typography variant="body2" color="error">&ensp; {registerFail}</Typography></Grid>
                        )}
                        <InputField control={control} name="firstname" label="First Name" error={errors} type="text" half  autoFocus/>
                        <InputField control={control} name="lastname" label="Last Name" error={errors} type="text" half/>        
                        <InputField control={control} name="email" label="Email" error={errors} type ="email" />
                        <InputField control={control} name="password" label="Password" error={errors} type={showPassword ? 'text' : 'password'} handleShowpassword={handleShowpassword}/>
                        <InputField control={control} name="confirmpassword" label="Confirm Password" error={errors} type='password' />
                    </Grid>
                    <ButtonSubmit type="submit" fullWidth variant="contained" color="primary">
                        Sign Up
                    </ButtonSubmit>
                    <Grid container justifyContent="flex-end"> 
                        <Grid item >
                            <Typography>
                                Already have an account? <Button component={Link} to='/login'>Sign In</Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </FormData>
            </PaperForm>
        </ContainerForm>
    )
}

export default RegisterForm
