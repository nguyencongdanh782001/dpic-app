import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const GridContainer = styled(Grid)(({theme}) => ({
    marginLeft:8,
    width:'95%'
}))

export const GridItem = styled(Grid)(({theme}) => ({
    display:'flex',
    padding: '10px 5px 10px 9px',
    borderRadius:8,
    cursor: 'pointer',
    textDecoration:'none',
    alignItems:'center',
    color:'#757575',
    fontSize:'18px',
    '&:hover':{
        backgroundColor:'#f5f5f5'
    },
}))

export const Container = styled("a")(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderRadius: 8,
  textDecoration: "none",
  color: "#616161",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
}));

export const Left = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  width: "auto",
  padding: theme.spacing(1, 0, 1, 1),
}));

export const Right = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(0, 2, 0, 2),
}));

export const Image = styled("img")(({ theme }) => ({
  width: "auto",
  height: "100px",
  borderRadius: 6,
  [theme.breakpoints.down('md')]:{
    height: "80px",
  }
}));
