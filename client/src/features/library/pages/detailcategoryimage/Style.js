import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Grid)(({theme}) => ({
    paddingTop:theme.spacing(9)
}))

export const ContainerImage = styled(Grid)(({theme}) => ({
    paddingTop:'14px', 
    [theme.breakpoints.down('sm')]:{
        paddingBottom:'17px' 
    }
}))

export const ImageItem = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent:'center',
    marginBottom:theme.spacing(2)
 }))

export const Image = styled('img')(({theme}) => ({
    width:'70%',
    height: 'auto',
    border:'1px solid #bdbdbd',
    [theme.breakpoints.down('sm')]:{
        width:'90%', 
    }
}))

export const Title = styled(Typography)(({theme}) => ({
}))

export const Time = styled(Typography)(({theme}) => ({
    marginTop:'20px',
    marginLeft:'1px',
}))

export const Category = styled(Typography)(({theme}) => ({
    marginBottom:theme.spacing(1),
    marginTop:theme.spacing(1),
}))

export const Message = styled(Typography)(({theme}) => ({
    marginBottom:theme.spacing(3)
}))