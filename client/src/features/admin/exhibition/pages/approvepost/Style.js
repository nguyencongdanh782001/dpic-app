import { Box, styled } from "@mui/system";

export const EndPost = styled(Box)(({theme}) => ({
    width: "100%",
    [theme.breakpoints.down('sm')]:{
      width: "91%",
    },
  }))