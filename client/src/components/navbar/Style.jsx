import {
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const ToolbarMenu = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const MenuItemLeft = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "5%",
  [theme.breakpoints.down("sm")]: {
    width: "5%",
  },
}));

export const MenuItemMid = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "35%",
  "& :hover": {
    backgroundColor: "#fafafa",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const MenuItemRight = styled("div")(({ theme, user }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: user?.role ? "7%" : "9%",
  [theme.breakpoints.down("md")]: {
    width: user?.role ? "13%" : "18%",
  },
  [theme.breakpoints.down("sm")]: {
    width: user?.role ? "25%" : "32%",
  },
}));

export const ToggleButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

export const Logo = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#424242",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const SearchForm = styled("form")(({ theme, open }) => ({
  display: open ? "flex" : "none",
  position: "relative",
  border: "1px solid #bdbdbd",
  alignItems: "center",
  borderRadius: 11,
  width: "30%",
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
    border: "1px solid black",
  },
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(0, 4, 0, 4),
  borderRadius: 10,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 4, 0, 3),
  },
}));

export const CloseSearch = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 6,
  right: 4,
  color: "#9e9e9e",
  cursor: "pointer",
  "& :hover": {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
}));

export const SearchClup = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 6,
  left: 4,
  [theme.breakpoints.down("sm")]: {
    left: 2,
  },
}));

export const MenuLinkMid = styled(Typography)(({ theme }) => ({
  width: "30%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2, 0, 2, 0),
  borderRadius: 8,
  cursor: "pointer",
  color: "#9e9e9e",
  "& .active > div": { color: "yellow" },
}));

export const TooltipIcon = styled(Tooltip)(({ theme }) => ({
  backgroundColor: "#fafafa",
}));

//---------------------------Menu Slide---------------------------------
export const SliderMenu = styled("div")(({ theme }) => ({
  width: "210px",
  height: "100vh",
}));

export const HeaderMenu = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

export const LogoSlider = styled(Typography)(({ theme }) => ({
  width: "45%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  padding: theme.spacing(1, 0, 0, 2),
  color: "#757575",
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1, 1, 0, 0),
}));

export const MenuSliderList = styled("ul")(({ theme }) => ({
  marginTop: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  listStyle: "none",
}));

export const MenuSliderItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(2, 0, 2, 0),
}));

export const MenuSliderLink = styled(Typography)(({ theme }) => ({
  display: "flex",
  fontWeight: "bold",
  color: "#757575",
  cursor: "pointer",
  textDecoration: "none",
}));

export const MenuSliderChild = styled("ul")(({ theme }) => ({
  listStyle: "none",
  marginTop: theme.spacing(1),
  paddingLeft: theme.spacing(0),
  paddingTop: "1px",
  paddingBottom: "1px",
  backgroundColor: "#f5f5f5",
  width: "95%",
  borderRadius: 6,
}));

export const MenuSliderChildItem = styled("li")(({ theme }) => ({
  padding: theme.spacing(1, 0, 1, 2),
  width: "91%",
  borderRadius: 5,
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
}));

export const MenuSliderChildLink = styled(Typography)(({ theme }) => ({
  display: "flex",
  textDecoration: "none",
  color: "#757575",
  alignItems: "center",
}));
