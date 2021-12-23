import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./Style.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const AllImageItem = ({ photos, handledeletePhoto, category }) => {
  return (
    <div className="container">
      <Link
        to={
          category
            ? `/library/category/${category}/${photos._id}`
            : `/library/photos/${photos._id}`
        }
      >
        {photos?.image.map((img, index) => (
          <img
            key={index}
            className="image"
            src={`${process.env.REACT_APP_API_IMAGE}${img}`}
            alt=""
          />
        ))}
      </Link>
      <div className="buttonList">
        <Typography
          className="buttonItem"
          component={Link}
          to={`/library/photos/${photos._id}`}
        >
          <SearchOutlinedIcon fontSize="small" />
        </Typography>
        <Typography
          className="buttonItem"
          onClick={handledeletePhoto?.bind(this, photos._id)}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </Typography>
      </div>
    </div>
  );
};

export default AllImageItem;
