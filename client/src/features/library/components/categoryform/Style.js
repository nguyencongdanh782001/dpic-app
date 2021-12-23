import { styled } from "@mui/system";
import { Button, Container, IconButton } from '@mui/material'
import { Form } from "formik";

export const ButtonAdd = styled(Button)(({theme}) => ({
    position:'relative',
}))

export const ContainerModal = styled(Container)(({theme}) => ({
    borderRadius: 7,
    width:'60%',
    height: '210px',
    backgroundColor:'white',
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    margin:'auto',
    [theme.breakpoints.down('sm')]:{
        width:'85%',
        height:'24vh',
        overflow: 'scroll'
    }
}))

export const FormModal = styled(Form)(({theme}) => ({
    paddingTop: theme.spacing(2)
}))

export const ButtonSubmit = styled(Button)(({theme}) => ({
    margin: theme.spacing(3, 0, 2)
}))

export const Title = styled('div')(({theme}) => ({
    alignItems:'center',
    textAlign:'center',
    margin: theme.spacing(0, 0, 2, 0)
}))

export const Close = styled(IconButton)(({theme}) => ({
    position: 'absolute',
    top:4,
    right: 4,
}))

