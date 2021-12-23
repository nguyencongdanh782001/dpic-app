import { Button, } from "@mui/material";
import { styled } from "@mui/system";


export const Container = styled('div')(({theme}) => ({
    backgroundColor:'#eeeeee',
    boxShadow: "rgba(0, 0, 0, 0.5) 2.5px 2.5px 2.6px",
    borderRadius:7,
    position: 'relative',
    width:'100%',
    paddingBottom:'5px',
}))

export const HeaderNotify = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent:'space-between',
    padding: theme.spacing(1,1,1,1)
}))

export const HeaderLeft = styled('div')(({theme}) => ({
    display: 'flex',
}))

export const ButtonComment = styled(Button)(({theme}) =>({
    fontSize:'12px',
    height:'15px'
}))
