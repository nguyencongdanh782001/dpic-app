import { IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";


export const Container = styled('div')(({theme}) => ({
    cursor:'pointer',
    backgroundColor:'#e0e0e0',
    borderRadius:7,
    position: 'relative',
    width:'100%',
    paddingBottom:'5px',
    '&:hover':{
        backgroundColor:'#eeeeee'
    }
}))

export const Menu = styled(IconButton)(({theme}) => ({
   position: 'absolute',
   right:1,
   top:1,
   zIndex:1
}))

export const Folder = styled('div')(({theme}) => ({
    padding:theme.spacing(1, 0, 1, 0),
}))

export const MenuList = styled(Box)(({theme}) => ({
    position:'absolute',
    top:5,
    right:35,
    display: 'flex',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'white',
    width:'70px',
    height:'25px',
    borderRadius:8,
    [theme.breakpoints.down('sm')]:{
        width:'65px',
    }
}))

export const MenuItem = styled('div')(({theme}) => ({
    cursor:'pointer',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    width: '24px',
    height:'25px',
    '&:hover':{
        backgroundColor:'#eeeeee',
    }
}))