import { styled } from "@mui/system";

export const Buttonheader = styled('div')(({theme}) => ({
    width:'25%', 
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]:{
        width:'100%', 
    }
}))