import {styled } from "@mui/system";
  

export const ImageItem = styled('div')(({theme}) =>({
    height: '100%',
    width:'100%',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
}))
export const Image = styled('img')(({theme}) => ({
    opacity: 1,
    display:'block',
    width:'100%',
    height:'auto',
    transition: '.5sease',
    backfaceVisibility:'hidden',
    border:'1px solid #9e9e9e',
}))

export const ButtonList = styled('div')(({theme}) => ({
    display:'flex',
    transition: '.5sease',
    opacity: 0,
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    alignItems:'center'
}))

export const ButtonItem = styled('div')(({theme}) => ({
    backgroundColor:'white',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    height:'28px',
    width:'28px',
    cursor: 'pointer',
    color:'#616161',
    marginLeft:theme.spacing(3),
}))
