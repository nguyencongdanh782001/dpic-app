import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArtTrackOutlinedIcon from "@mui/icons-material/ArtTrackOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PhotoAlbumOutlinedIcon from "@mui/icons-material/PhotoAlbumOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Cameramini } from "../../constants/Image";
import { getuser, logout } from "../../features/auth/authSlice";
import { getNotify, seenNotify } from "../../features/exhibition/notifySlice";
import {
  CloseButton,
  CloseSearch,
  HeaderMenu,
  Logo,
  LogoSlider,
  MenuItemLeft,
  MenuItemMid,
  MenuItemRight,
  MenuLinkMid,
  MenuSliderChild,
  MenuSliderChildItem,
  MenuSliderChildLink,
  MenuSliderItem,
  MenuSliderLink,
  MenuSliderList,
  SearchClup,
  SearchForm,
  SearchInput,
  SliderMenu,
  ToggleButton,
  ToolbarMenu,
  TooltipIcon,
} from "./Style";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLib, setOpenLib] = useState(false);
  const [openExh, setOpenExh] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const history = useHistory();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleClickLib = () => {
    setOpenLib((prevOpenLib) => !prevOpenLib);
  };
  const handleClickExh = () => {
    setOpenExh((prevOpenExh) => !prevOpenExh);
  };

  const handleOpenSearch = () => {
    setOpenSearch((prevOpenSearch) => !prevOpenSearch);
  };
  const handleCloseSearch = () => {
    setOpenSearch(false);
    setSearchValue("");
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      history.push(`search?searchQuery=${searchValue || "none"}`);
    } else {
      history.push("/");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    history.push("/");
  };
  // useEffect(() => {
  //   const token = user?.token;
  //   if (token) {
  //     const decodedToken = decode(token);
  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }
  //   setUser(JSON.parse(localStorage.getItem(LOCAL_NAME)));
  // }, [location]);
  const notify = useSelector((state) => state.notifyReducer.notify);

  useEffect(() => {
    dispatch(getNotify());
  }, [dispatch]);
  const unread = notify.filter(
    (tb) => tb.seen.find((seen) => seen === user?._id) !== user?._id
  );
  const length = unread.length;

  const handleseen = async () => {
    try {
      await unread.map((unread) => dispatch(seenNotify(unread?._id)));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar position="fixed" color="inherit">
        <ToolbarMenu>
          <MenuItemLeft>
            <ToggleButton onClick={handleOpenDrawer}>
              <DehazeOutlinedIcon fontSize="large" />
            </ToggleButton>
            <Logo variant="subtitle2" component={Link} to="/home">
              <img src={Cameramini} alt="" />
              DPIC
            </Logo>
          </MenuItemLeft>
          <MenuItemMid>
            <Tooltip
              component={NavLink}
              to="/home"
              title="Home"
              aria-label="Home"
            >
              <MenuLinkMid>
                <HomeOutlinedIcon />
              </MenuLinkMid>
            </Tooltip>
            <Tooltip
              component={NavLink}
              to="/exhibition"
              title="Exhibition"
              aria-label="Exhibition"
            >
              <MenuLinkMid>
                {user?.role ? (
                  <Badge color="error" variant={length > 0 ? "dot" : ""}>
                    <AccountBalanceOutlinedIcon />
                  </Badge>
                ) : (
                  <AccountBalanceOutlinedIcon />
                )}
              </MenuLinkMid>
            </Tooltip>
            <Tooltip
              component={NavLink}
              to="/library"
              title="Library"
              aria-label="Library"
            >
              <MenuLinkMid>
                <PhotoLibraryOutlinedIcon />
              </MenuLinkMid>
            </Tooltip>
          </MenuItemMid>
          <SearchForm open={openSearch} onSubmit={handleSearchSubmit}>
            <SearchClup>
              <SearchIcon color="disabled" fontSize="small" />
            </SearchClup>
            <SearchInput
              autoFocus
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
            <CloseSearch onClick={handleCloseSearch}>
              <CloseOutlinedIcon fontSize="small" />
            </CloseSearch>
          </SearchForm>
          <MenuItemRight user={user}>
            <TooltipIcon title="Search" aria-label="Search">
              <IconButton onClick={handleOpenSearch}>
                <SearchIcon />
              </IconButton>
            </TooltipIcon>
            {user?.role ? (
              <>
                <TooltipIcon
                  title="Profile"
                  aria-label="Profile"
                  onClick={handleClick}
                >
                  <IconButton>
                    <ArrowDropDownRoundedIcon />
                  </IconButton>
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
                  <MenuItem onClick={handleClose}>
                    <Avatar clt={user?.name} src={user?.imageUrl}>
                      {user?.name?.charAt(0)}
                    </Avatar>{" "}
                    &nbsp;
                    <Typography variant="body1">{user?.name}</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} style={{ color: "#ff1744" }}>
                    <ListItemIcon>
                      <LogoutIcon style={{ color: "#ff1744" }} />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/login"
                  size="small"
                >
                  Login
                </Button>
              </>
            )}
          </MenuItemRight>
        </ToolbarMenu>
      </AppBar>
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
              <MenuSliderLink component={NavLink} to="/home">
                <HomeOutlinedIcon />
                &nbsp;Home
              </MenuSliderLink>
            </MenuSliderItem>
            <Divider style={{ width: "96%" }} />
            <MenuSliderItem onClick={handleClickExh}>
              <MenuSliderLink>
                {user?.role ? (
                  <Badge color="error" variant={unread.length > 0 ? "dot" : ""}>
                    <AccountBalanceOutlinedIcon />
                  </Badge>
                ) : (
                  <AccountBalanceOutlinedIcon />
                )}
                &nbsp;Exhibition
                <ArrowDropDownRoundedIcon />
              </MenuSliderLink>
              {openExh && (
                <MenuSliderChild>
                  <MenuSliderChildItem>
                    <MenuSliderChildLink component={NavLink} to="/exhibition">
                      <HomeOutlinedIcon />
                      &nbsp;Home
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuSliderChildItem>
                    {user?.role ? (
                      <>
                        <MenuSliderChildLink
                          onClick={handleseen}
                          component={NavLink}
                          to="/exhibition/notify"
                        >
                          <Badge
                            badgeContent={length > 9 ? "9+" : length}
                            color="error"
                          >
                            <NotificationsNoneOutlinedIcon />
                          </Badge>
                          &nbsp;Notify
                        </MenuSliderChildLink>
                      </>
                    ) : (
                      <>
                        <MenuSliderChildLink
                          component={NavLink}
                          to="/exhibition/notify"
                        >
                          <NotificationsNoneOutlinedIcon />
                          &nbsp;Notify
                        </MenuSliderChildLink>
                      </>
                    )}
                  </MenuSliderChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuSliderChildItem>
                    <MenuSliderChildLink
                      component={NavLink}
                      to="/exhibition/newpost"
                    >
                      <AddBusinessOutlinedIcon />
                      &nbsp;New Post
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                </MenuSliderChild>
              )}
            </MenuSliderItem>
            <Divider style={{ width: "96%" }} />
            <MenuSliderItem onClick={handleClickLib}>
              <MenuSliderLink>
                <PhotoLibraryOutlinedIcon />
                &nbsp;Library
                <ArrowDropDownRoundedIcon />
              </MenuSliderLink>
              {openLib && (
                <MenuSliderChild>
                  <MenuSliderChildItem>
                    <MenuSliderChildLink component={NavLink} to="/library">
                      <ArtTrackOutlinedIcon />
                      &nbsp;Posts
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuSliderChildItem>
                    <MenuSliderChildLink
                      component={NavLink}
                      to="/library/photos"
                    >
                      <ImageOutlinedIcon />
                      &nbsp;Photos
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                  <Divider style={{ marginLeft: "12px", width: "87%" }} />
                  <MenuSliderChildItem>
                    <MenuSliderChildLink
                      component={NavLink}
                      to="/library/category"
                    >
                      <PhotoAlbumOutlinedIcon />
                      &nbsp;Category
                    </MenuSliderChildLink>
                  </MenuSliderChildItem>
                </MenuSliderChild>
              )}
            </MenuSliderItem>
          </MenuSliderList>
        </SliderMenu>
      </Drawer>
    </>
  );
};

export default NavBar;
