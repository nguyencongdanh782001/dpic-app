import { styled } from "@mui/system";

export const Slider = styled('div')(({theme}) => ({
    paddingTop:theme.spacing(6),
    height: '80%',
    width: '100%',
    display: 'flex',
}))

export const SliderItem = styled('div')(({theme}) => ({
    height: '100%',
    width: '100%',
    margin: 'auto',
    position: 'relative',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:theme.spacing(3)
}))

export const Image = styled('img')(({theme}) => ({
    position: 'absolute',
    height:'11vh',
    transition: 'all 0.32s ease-in-out 0s',
    marginTop:'36px',
}))