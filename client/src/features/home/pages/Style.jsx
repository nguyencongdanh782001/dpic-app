import { Grid } from "@mui/material";
import { Box, styled } from "@mui/system";

export const GridAds = styled(Grid)(({theme}) => ({
  marginTop: -8,
  marginBottom: -8,
  height:'100vh',
  position: 'sticky',
  top:0,
  paddingTop:theme.spacing(10),
  [theme.breakpoints.down('md')]:{
    display:'none'
  },

}))

export const GridPost = styled(Grid)(({theme}) => ({
  paddingTop:theme.spacing(10)
}))

export const EndPost = styled(Box)(({theme}) => ({
  width: "66%",
  [theme.breakpoints.down('sm')]:{
    width: "91%",
  },
}))