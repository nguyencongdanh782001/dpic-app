// import {Typography } from "@mui/material";
import React, { useState } from "react";
import { ButtonComment, Container, HeaderLeft, HeaderNotify, Menu, MenuItem, MenuList } from "./Style";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Avatar, Typography } from "@mui/material";
import moment from "moment";

const NotifyItem = ({ notify, handleCurrentId, handleDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [seemore, setSeemore] = useState(false);

  const handleSeeMore = () => {
    setSeemore(true);
  };
  const handleSeeLess = () => {
    setSeemore(false);
  };

  const handleClick = () => {
    setOpenMenu((prevOpenmenu) => !prevOpenmenu);
  };
  return (
    <>
      <Container>
        <HeaderNotify>
          <HeaderLeft style={{}}>
            <Avatar clt={notify?.name} src={notify?.imageUrl}>
              {notify?.name?.charAt(0)}
            </Avatar>{" "}
            &ensp;
            <div>
              <Typography variant="body2">{notify?.name}</Typography>
              <Typography variant="caption">{moment(notify?.createAt).fromNow()}</Typography>
            </div>
          </HeaderLeft>
          <div>
            <Menu onClick={handleClick} size="small">
              <MoreVertIcon />
            </Menu>
            {openMenu && (
              <MenuList style={{ display: "flex" }}>
                <MenuItem onClick={handleCurrentId.bind(this, notify._id)}>
                  <ModeEditOutlinedIcon fontSize="small" />
                </MenuItem>
                <MenuItem onClick={handleDelete.bind(this, notify._id)}>
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </MenuItem>
              </MenuList>
            )}
          </div>
        </HeaderNotify>
        <div style={{ color: "#212121" }}>
          <div style={{ padding:"0 15px 5px 15px" }}>
          {notify?.message?.length > 150 ? (
          seemore ? (
            <Typography style={{ marginTop: "5px" }} variant="body1">
              {notify?.message}&nbsp;
              <ButtonComment size="small" onClick={handleSeeLess}>
                See less
              </ButtonComment>
            </Typography>
          ) : (
            <Typography style={{ marginTop: "5px" }} variant="body1">
              {notify?.message?.substring(0, 150)}...&nbsp;
              <ButtonComment size="small" onClick={handleSeeMore}>
                See more
              </ButtonComment>
            </Typography>
          )
        ) : (
          notify?.message
        )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotifyItem;
