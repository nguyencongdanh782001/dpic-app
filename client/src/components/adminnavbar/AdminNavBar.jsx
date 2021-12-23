import {
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Cameramini } from "../../constants/Image";
import { getuser, logout } from "../../features/auth/authSlice";
import {
  CloseButton,
  HeaderMenu,
  HeaderSlide,
  Info,
  Logo,
  LogoSlider,
  MenuChild,
  MenuChildItem,
  MenuChildLink,
  MenuItemLeft,
  MenuItemRight,
  MenuLink,
  MenuList,
  MenuSlideItem,
  MenuSliderChild,
  MenuSliderChildItem,
  MenuSliderChildLink,
  MenuSliderItem,
  MenuSliderLink,
  MenuSliderList,
  SlideMenu,
  SliderMenu,
  ToggleButton,
  ToolbarMenu,
  TooltipIcon,
} from "./Style";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box } from "@mui/system";

const AdminNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = useSelector((state) => state.authReducer.user);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openExh, setOpenExh] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleClickExh = () => {
    setOpenExh((prevOpenExh) => !prevOpenExh);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    history.push("/login");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit">
        <ToolbarMenu>
          <MenuItemLeft>
            <ToggleButton onClick={handleOpenDrawer}>
              <DehazeOutlinedIcon fontSize="large" />
            </ToggleButton>
            <Logo variant="subtitle2">
              <img src={Cameramini} alt="" />
              DPIC
            </Logo>
          </MenuItemLeft>
          <MenuItemRight user={user}>
            <TooltipIcon
              title="Profile"
              aria-label="Profile"
              onClick={handleClick}
            >
              <Info>
                <Avatar
                  clt={user?.name}
                  src={user?.imageUrl}
                  sx={{ width: 30, height: 30 }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>{" "}
                &nbsp;
                <Typography variant="body2" style={{color:'#757575'}}>{user?.name}</Typography>
                <ArrowDropDownRoundedIcon />
              </Info>
            </TooltipIcon>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout} style={{ color: "#ff1744", backgroundColor:'white' }}>
                <ListItemIcon>
                  <LogoutIcon style={{ color: "#ff1744" }} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </MenuItemRight>
        </ToolbarMenu>
      </AppBar>
      <Drawer anchor="left" variant="permanent">
        <SlideMenu>
          <HeaderSlide>
            <Avatar clt={user?.name} src={user?.imageUrl}>
              {user?.name?.charAt(0)}
            </Avatar>{" "}
            &ensp;
            <div>
              <Typography variant="caption">Welcome</Typography>
              <Typography variant="body2">{user?.name}</Typography>
            </div>
          </HeaderSlide>
          <Divider />
          <MenuList>
            <MenuSlideItem>
              <MenuLink component={Link} to="/admin/dashboard">
                <DesktopWindowsOutlinedIcon fontSize="medium"/>
                &nbsp;Dashboard
              </MenuLink>
            </MenuSlideItem>
            <MenuSlideItem>
              <MenuLink component={Link} to="/admin/advertise">
                <AddBusinessOutlinedIcon />
                &nbsp;Advertise
              </MenuLink>
            </MenuSlideItem>
            <MenuSlideItem onClick={handleClickExh}>
              <MenuLink>
                <AccountBalanceOutlinedIcon fontSize="medium"/>
                &nbsp;Exhibition
                <ArrowDropDownRoundedIcon fontSize="medium"/>
              </MenuLink>
              {openExh && (
                <MenuChild>
                  <MenuChildItem>
                    <MenuChildLink component={Link} to="/admin/exhibition">
                      <HomeOutlinedIcon />
                      &nbsp;Home
                    </MenuChildLink>
                  </MenuChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuChildItem>
                    <MenuChildLink
                      component={Link}
                      to="/admin/exhibition/addnotify"
                    >
                      <NotificationAddOutlinedIcon/>
                      &nbsp;Add Notify
                    </MenuChildLink>
                  </MenuChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuChildItem>
                    <MenuChildLink
                      component={Link}
                      to="/admin/exhibition/checkpost"
                    >
                      <NoteAltOutlinedIcon/>
                      &nbsp;Check Post
                    </MenuChildLink>
                  </MenuChildItem>
                </MenuChild>
              )}
            </MenuSlideItem>
            <MenuSlideItem>
              <MenuLink component={Link} to="/admin/account">
                <AccountCircleOutlinedIcon fontSize="medium"/>
                &nbsp;Account
              </MenuLink>
            </MenuSlideItem>
          </MenuList>
        </SlideMenu>
      </Drawer>

{/* mobile */}
      <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
        <SliderMenu>
          <HeaderMenu>
            <LogoSlider variant="h5">
              <img src={Cameramini} alt="" />
              DPIC
            </LogoSlider>
            <CloseButton onClick={handleCloseDrawer}>
              <CloseOutlinedIcon />
            </CloseButton>
          </HeaderMenu>
          <Divider />
          <MenuSliderList>
            <MenuSliderItem>
              <MenuSliderLink component={Link} to="/admin/dashboard">
                <DesktopWindowsOutlinedIcon />
                &nbsp;Dashboard
              </MenuSliderLink>
            </MenuSliderItem>
            <Divider style={{ width: "96%" }} />
            <MenuSliderItem>
              <MenuSliderLink component={Link} to="/admin/advertise">
                <AddBusinessOutlinedIcon />
                &nbsp;Advertise
              </MenuSliderLink>
            </MenuSliderItem>
            <Divider style={{ width: "96%" }} />
            <MenuSliderItem onClick={handleClickExh}>
              <MenuSliderLink>
                <AccountBalanceOutlinedIcon />
                &nbsp;Exhibition
                <ArrowDropDownRoundedIcon />
              </MenuSliderLink>
              {openExh && (
                <MenuSliderChild>
                  <MenuSliderChildItem>
                    <MenuSliderChildLink component={Link} to="/admin/exhibition">
                      <HomeOutlinedIcon />
                      &nbsp;Home
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuSliderChildItem>
                    <MenuSliderChildLink
                      component={Link}
                      to="/admin/exhibition/addnotify"
                    >
                      <NotificationAddOutlinedIcon />
                      &nbsp;Add Notify
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuSliderChildItem>
                    <MenuSliderChildLink
                      component={Link}
                      to="/admin/exhibition/checkpost"
                    >
                      <NoteAltOutlinedIcon/>
                      &nbsp;Check Posts
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                </MenuSliderChild>
              )}
            </MenuSliderItem>
            <Divider style={{ width: "96%" }} />
            <MenuSliderItem>
              <MenuSliderLink component={Link} to="/admin/account">
                <AccountCircleOutlinedIcon />
                &nbsp;Account
              </MenuSliderLink>
            </MenuSliderItem>
          </MenuSliderList>
        </SliderMenu>
      </Drawer>
    </Box>
  );
};

export default AdminNavBar;
