import { styled } from "@mui/system";
import { Button, Container, IconButton } from '@mui/material'
import { Form } from "formik";

export const ButtonAdd = styled(Button)(({theme}) => ({
    marginBottom:theme.spacing(2)
}))

export const ContainerModal = styled(Container)(({theme}) => ({
    borderRadius: 7,
    width:'80%',
    height: '410px',
    backgroundColor:'white',
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    margin:'auto',
        [theme.breakpoints.down('sm')]:{
            width:'100%',
            height:'100vh',
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

export const ImageItem = styled('div')(({theme}) => ({
    position:'relative',
    border: '1px solid #bdbdbd',
    marginTop:0,
    marginBottom:'15px',
    borderRadius:7,
    height:'257px',
    width: '100%'
}))

export const Close = styled(IconButton)(({theme}) => ({
    position: 'absolute',
    top:4,
    right: 4,
}))

export const Image = styled('img')(({theme}) => ({
    width: '100%',
    height:'100%',
    borderRadius:7,
    objectFit:'scale-down',
}))

