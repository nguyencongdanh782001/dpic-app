import { IconButton } from "@mui/material"
import { Box, styled } from "@mui/system"

export const Menu = styled(IconButton)(({theme}) => ({

}))
export const MenuList = styled(Box)(({theme}) => ({
    position:'absolute',
    top:5,
    right:40,
    display: 'flex',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#eeeeee',
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
        backgroundColor:'#f5f5f5',
    }
}))