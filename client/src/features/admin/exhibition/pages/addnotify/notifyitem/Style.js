import { Button, IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";


export const Container = styled('div')(({theme}) => ({
    backgroundColor:'#eeeeee',
    boxShadow: "rgba(0, 0, 0, 0.5) 2.5px 2.5px 2.6px",
    borderRadius:7,
    position: 'relative',
    width:'100%',
    paddingBottom:'5px',
}))

export const Menu = styled(IconButton)(({theme}) => ({

}))

export const Folder = styled('div')(({theme}) => ({
    padding:theme.spacing(1, 0, 1, 0),
}))

export const MenuList = styled(Box)(({theme}) => ({
    position:'absolute',
    top:12,
    right:40,
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
