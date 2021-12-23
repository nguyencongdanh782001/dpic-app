import { Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { Category } from "../../../../../constants/Image";
import { Container, Folder, Menu, MenuItem, MenuList } from "./Style";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
const CategoryItem = ({ categories, handleCurrentId, handleDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => {
    setOpenMenu((prevOpenmenu) => !prevOpenmenu);
  };
  return (
    <>
      <Container>
        <Menu onClick={handleClick} size="small">
          <MoreVertIcon />
        </Menu>
        {openMenu && (
          <MenuList styel={{ display: "flex" }}>
            <MenuItem onClick={handleCurrentId.bind(this, categories._id)}>
              <ModeEditOutlinedIcon fontSize="small" />
            </MenuItem>
            <MenuItem onClick={handleDelete.bind(this, categories._id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </MenuItem>
          </MenuList>
        )}
        <Link
          to={`/library/category/${categories._id}`}
          style={{ textDecoration: "none", color: "#757575" }}
        >
          <Folder style={{ display: "flex", justifyContent: "center" }}>
            <img src={Category} alt="" />
          </Folder>
          <Divider />
          <div style={{ paddingTop:'5px' }}>
            {categories.name.length > 11 ? (
              <Typography style={{ textAlign: "center" }}>
                {categories?.name.substring(0, 11)}...
              </Typography>
            ) : (
              <Typography style={{ textAlign: "center" }}>
                {categories?.name}
              </Typography>
            )}
          </div>
        </Link>
      </Container>
    </>
  );
};

export default CategoryItem;
