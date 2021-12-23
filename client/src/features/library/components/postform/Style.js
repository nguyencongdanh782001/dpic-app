import { styled } from "@mui/system";
import {
  Button,
  Container,
  Fab,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Form } from "formik";

export const FabAdd = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: 25,
  right: 30,
}));

export const ContainerModal = styled(Container)(({ theme }) => ({
  borderRadius: 7,
  width: "80%",
  height: "468px",
  backgroundColor: "white",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "60vh",
    overflow: "scroll",
  },
}));

export const FormModal = styled(Form)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

export const ButtonSubmit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export const Title = styled("div")(({ theme }) => ({
  alignItems: "center",
  textAlign: "center",
  margin: theme.spacing(0, 0, 2, 0),
}));

export const List = styled(ImageList)(({ theme }) => ({
  border: "1px solid #bdbdbd",
  marginTop: "none",
  borderRadius: 7,
}));

export const ImageItem = styled(ImageListItem)(({ theme }) => ({
  position: "relative",
}));

export const Close = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 1,
  right: 5,
}));

export const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: 7,
  objectFit: "scale-down",
}));
