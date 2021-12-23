import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import RegisterForm from '../../components/registerform/RegisterForm'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../authSlice';

const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [registerFail, setRegisterFail] = useState(null)
    const schema = yup.object().shape({
        firstname: yup.string().required('First Name is required!'),
        lastname: yup.string().required('Last Name is required!'),
        email: yup.string().email().required('Email is required!'),
        password: yup.string().required('Password is required!').min(6,'password must be at least 6 characters!'),
        confirmpassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match!')
    })
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async value => {
        const data = await dispatch(signup({...value, role: 'user'}))
        if(data?.payload){
            if(data?.payload?.result?.role === 'admin'){
                history.push('/admin/dashboard')
            }else{
             history.push('/')
            }
        }else{
            setRegisterFail('Email already exists!')
        }
    }
    return (
        <RegisterForm control={control} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} registerFail={registerFail}/>
    )
}

export default Register
