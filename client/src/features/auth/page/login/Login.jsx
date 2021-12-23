import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import LoginForm from '../../components/loginform/LoginForm'
import {useDispatch} from 'react-redux'
import { signin } from '../../authSlice';
import { useHistory } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [loginFail, setLoginFail] = useState(null)
    const schema = yup.object().shape({
        email: yup.string().email().required('Email is required!'),
        password: yup.string().required('Password is required!'),
    })
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async value =>{
       const data = await dispatch(signin(value))
       if(data?.payload){
           if(data?.payload?.result?.role === 'admin'){
               history.push('/admin/dashboard')
           }else{
            history.push('/')
           }
       }else{
           setLoginFail('Email or Password is incorrect!')
       }
    }

    return (
        <LoginForm control={control} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} loginFail={loginFail}/>
    )
}

export default Login
