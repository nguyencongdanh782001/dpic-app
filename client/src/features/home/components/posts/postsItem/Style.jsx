import { Button, CardActions,IconButton } from "@mui/material";
import { styled } from "@mui/system";
  

export const SectionImg = styled('section')(({theme}) =>({
    width:'100%',
    height:'100%',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor:'black'
}))

export const Image = styled('img')(({theme}) =>({
   width:'auto', 
   height:'420px', 
   objectFit:'scale-down',
   transition: 'all 1s ease 0s',
   [theme.breakpoints.down('sm')]:{
    height:'300px', 
   }
}))

export const Left = styled(IconButton)(({theme}) =>({
    position:'absolute',
    left:5,
    backgroundColor:'#f5f5f5',
    opacity: '0.5'

}))

export const Right = styled(IconButton)(({theme}) =>({
    position:'absolute',
    right:5,
    backgroundColor:'#f5f5f5',
    opacity:'0.5'
}))

export const CardActionButton = styled(CardActions)(({theme}) =>({
   display: 'flex',
   justifyContent:'space-between',
   padding:theme.spacing(1,2,1,2)
}))

export const ButtonBottom = styled(Button)(({theme}) =>({
    width:'33%'
}))

export const ButtonComment = styled(Button)(({theme}) =>({
    fontSize:'12px',
    height:'15px',
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