import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/system";


export const ToolbarMenu = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between'
}))

export const MenuItemLeft = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    width:'265px',
    [theme.breakpoints.down('md')]:{
        width:'12%',
    },
    [theme.breakpoints.up('lg')]:{
        width:'25%',
    }
}))

export const MenuItemRight = styled('div')(({theme, user}) => ({
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width: 'auto',
}))

export const ToggleButton = styled(IconButton)(({theme}) => ({
    display: 'none',
    [theme.breakpoints.down('md')]:{
       display:'flex'
    },
}))

export const Logo = styled(Typography)(({theme}) => ({
    display: 'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    fontWeight:'bold',
    [theme.breakpoints.down('md')]:{
        display:'none'
    },
}))

export const TooltipIcon = styled(Tooltip)(({theme}) => ({
}))

export const Info = styled('div')(({theme}) => ({
    height:'100%',
    width:'auto',
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    cursor: 'pointer',
    color:'',
}))

//-----------------------------slideMenu-----------------------------

export const SlideMenu = styled('div')(({theme}) => ({
    width: '240px',
    height:'100vh',
    [theme.breakpoints.down('md')]:{
        display:'none'
    },
    [theme.breakpoints.up('lg')]:{
        width: '300px'
    }
}))

export const HeaderSlide = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    padding: theme.spacing(1,1,0,2),
    marginBottom:theme.spacing(1),
    color:"#757575"
}))

export const MenuSlideItem = styled('li')(({theme}) => ({
    marginRight:theme.spacing(1),
}))
 
export const MenuLink = styled(Typography)(({theme}) => ({
    display: 'flex',
    fontWeight:'bold',
    color: '#757575',
    cursor:'pointer',
    textDecoration:'none',
    alignItems:'center',
    padding:theme.spacing(2, 0, 2, 1),
    borderRadius:6,
    "&:hover":{
        backgroundColor:'#f5f5f5'
    }
}))

export const MenuChild = styled('ul')(({theme}) => ({
    listStyle:'none',
    paddingLeft:theme.spacing(0),
    paddingTop:'1px',
    paddingBottom:'1px',
    backgroundColor:'#f5f5f5',
    width: '100%',
    marginTop:theme.spacing(1),
    borderRadius:6
}))
 
export const MenuChildItem = styled('li')(({theme}) => ({
    padding:theme.spacing(1, 0, 1, 2),
    width: '100%',
    borderRadius:5,
    '&:hover':{
        backgroundColor:'#e0e0e0'
    },
}))
 
export const MenuChildLink = styled(Typography)(({theme}) => ({
    display: 'flex',
    textDecoration:'none',
    color: '#757575',
    alignItems:'center',
    fontSize:'17px'
}))
// -----------------------------slider------------------------------
export const SliderMenu = styled('div')(({theme}) => ({
    width: '210px',
    height:'100vh'
}))
 
 export const HeaderMenu = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:theme.spacing(1)
}))

export const MenuList = styled('ul')(({theme}) => ({
    marginTop:theme.spacing(2),
    paddingLeft:theme.spacing(1),
    listStyle:'none',
}))
 
export const LogoSlider = styled(Typography)(({theme}) => ({
     width:'45%',
     display: 'flex',
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     fontWeight:'bold',
     padding:theme.spacing(1, 0, 0, 2),
     color:'#757575'
 }))
 
export const CloseButton = styled(IconButton)(({theme}) => ({
    margin:theme.spacing(1, 1, 0, 0),
 }))
 
export const MenuSliderList = styled('ul')(({theme}) => ({
    marginTop:theme.spacing(2),
    paddingLeft:theme.spacing(1),
    listStyle:'none',
}))
 
export const MenuSliderItem = styled('li')(({theme}) => ({
    margin:theme.spacing(2, 0, 2, 0),
}))

export const MenuSliderLink = styled(Typography)(({theme}) => ({
    display: 'flex',
    fontWeight:'bold',
    color: '#757575',
    cursor:'pointer',
    textDecoration:'none',
    alignItems:'center'
}))
 
export const MenuSliderChild = styled('ul')(({theme}) => ({
    listStyle:'none',
    marginTop:theme.spacing(1),
    paddingLeft:theme.spacing(0),
    paddingTop:'1px',
    paddingBottom:'1px',
    backgroundColor:'#f5f5f5',
    width: '95%',
    borderRadius:6
}))
 
export const MenuSliderChildItem = styled('li')(({theme}) => ({
    padding:theme.spacing(1, 0, 1, 2),
    width: '100%',
    borderRadius:5,
    '&:hover':{
        backgroundColor:'#e0e0e0'
    },
}))
 
export const MenuSliderChildLink = styled(Typography)(({theme}) => ({
    display: 'flex',
    textDecoration:'none',
    color: '#757575',
    alignItems:'center',
}))