import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const GridLeft = styled(Grid)(({theme}) => ({
    paddingTop:theme.spacing(9),
    position: 'sticky',
    top:0,
    height: '100vh',
    backgroundColor:'white',
    borderRight:'1px solid #bdbdbd',
    marginLeft:-8,
    marginBottom:-8,
    marginTop:-8,
    width:'100%',
    [theme.breakpoints.down('md')]:{
        display:'none'
    },
}))

export const GridRight = styled(Grid)(({theme}) => ({
    paddingTop:theme.spacing(9),
}))