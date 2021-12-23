import { Button, CardActions, IconButton, Box, Typography } from "@mui/material";
import {styled } from "@mui/system";
  

export const SectionImg = styled('section')(({theme}) =>({
    width:'100%',
    height:'100%',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
}))

export const Image = styled('img')(({theme}) =>({
   width:'100%', 
   height:'auto', 
   objectFit:'cover',
   transition: 'all 1s ease 0s',
   [theme.breakpoints.down('sm')]:{
    height:'300px', 
   }
}))

export const CardActionButton = styled(CardActions)(({theme}) =>({
   display: 'flex',
   justifyContent:'space-between',
   padding:theme.spacing(1,2,1,2)
}))

export const ButtonBottom = styled(Button)(({theme}) =>({
    width:'50%'
}))

export const ButtonComment = styled(Button)(({theme}) =>({
    fontSize:'12px',
    height:'15px'
}))

export const PostHeader = styled('div')(({theme}) =>({
    display: "flex", 
    justifyContent: "space-between"
}))

export const MoreButton = styled(IconButton)(({theme}) =>({
    marginLeft:'85px',
    marginTop:'15px'
}))

export const MoreMenu = styled(Box)(({theme}) =>({
    position: "relative",
    width:'130px',
}))
export const MoreMenuItem = styled(Box)(({theme}) =>({
    position: "absolute",
    border:'1px solid #e0e0e0',
    borderRadius:5,
    zIndex:1,
    width:'115px',
    height:'38px',
    backgroundColor:'white',
    left:0,
}))

export const MoreMenuContent = styled(Typography)(({theme}) =>({
    padding:theme.spacing(1,0,1,2),
    borderRadius:3,
    cursor: 'pointer',
    alignItems:'center',
    display:'flex',
    fontWeight:'bold',
    color:'#ff1744',
    fontSize:'15px',
    '&:hover':{
        backgroundColor:'#f5f5f5'
    }
}))

export const ContentComment = styled('div')(({theme}) =>({
    display: 'flex',
    alignItems:'center',
    padding:theme.spacing(0,2,0,3),
    margin: theme.spacing(1,0,1,0),
}))

export const CommentText = styled('div')(({theme}) =>({
    margin: theme.spacing(0,2,0,1),
    padding:theme.spacing(1,1,1,1),
    width: 'auto',
    height:'auto',
    backgroundColor:'#f5f5f5',
    borderRadius:15
}))

