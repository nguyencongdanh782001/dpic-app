import { Typography } from "@mui/material";
import React, { useState } from "react";
import {
  Container,
  Image,
  Left,
  Menu,
  MenuItem,
  MenuList,
  Right,
} from "./Style";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const AdvertiseItem = ({ advertise, handleCurrentId, handleDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => {
    setOpenMenu((prevOpenmenu) => !prevOpenmenu);
  };

  return (
    <div style={{ position: "relative" }}>
      <Container href={advertise?.link}>
        <Left>
          {advertise?.image.map((img, index) => (
            <Image key={index} src={`${process.env.REACT_APP_API_IMAGE}${img}`} alt="" />
          ))}
        </Left>
        <Right>
          <Typography variant="h6">{advertise?.name}</Typography>
          <Typography variant="caption">
            {advertise?.link?.length > 25
              ? `${advertise.link.substring(0, 22)}...`
              : advertise?.link}
          </Typography>
        </Right>
      </Container>
      <div>
        <Menu onClick={handleClick} size="small">
          <MoreVertIcon />
        </Menu>
        {openMenu && (
          <MenuList style={{ display: "flex" }}>
            <MenuItem onClick={handleCurrentId.bind(this, advertise._id)}>
              <ModeEditOutlinedIcon fontSize="small" />
            </MenuItem>
            <MenuItem onClick={handleDelete.bind(this, advertise._id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </MenuItem>
          </MenuList>
        )}
      </div>
    </div>
  );
};

export default AdvertiseItem;
