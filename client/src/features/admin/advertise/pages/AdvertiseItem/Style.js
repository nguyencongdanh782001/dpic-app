import { IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";

export const Container = styled('a')(({theme}) => ({
    cursor: 'pointer',
    display: 'flex',
    justifyContent:'center',
    width:'100%',
    borderRadius: 8,
    backgroundColor:'#f5f5f5',
    textDecoration:'none',
    color:'#616161',
    '&:hover':{
        backgroundColor:'#fafafa',
    }
}))

export const Left = styled('div')(({theme}) => ({
    alignItems:'center',
    display: 'flex',
    justifyContent:'flex-start', 
    width:'auto',
    padding:theme.spacing(1,0,1,1)
}))

export const Right = styled('div')(({theme}) => ({
    width:'100%',
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    padding:theme.spacing(0,2,0,2),
}))

export const Image = styled('img')(({theme}) => ({
    width:'auto',
    height: '120px',
    borderRadius: 6,
}))

export const Menu = styled(IconButton)(({theme}) => ({
    position:'absolute',
    right:5,
    top:5
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

