import {InputBase} from "@mui/material";
import { styled } from "@mui/system";

export const Comment = styled(InputBase)(({theme}) => ({
    width:'100%',
    height:'auto',
    padding:"6px 10px 7px 13px",
    display:'flex',
    alignItems:'center',
    backgroundColor:'#e0e0e0',
    borderRadius:12,
}))