import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const GridSlider = styled(Grid)(({theme})=>({
    [theme.breakpoints.down('md')]:{
        display:'none'
    }
    
}))

export const GridForm = styled(Grid)(({theme})=>({
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'center'
    
}))