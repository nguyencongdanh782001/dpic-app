import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import {
  ButtonBottom,
  ButtonComment,
  CardActionButton,
  Image,
  PostHeader,
  SectionImg,
} from "./Style";
import React, { useState } from "react";
import moment from "moment";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const AllPostsItem = ({ posts, handleDeletePost, handleApprove }) => {
  const [seemore, setSeemore] = useState(false);

  const handleSeeMore = () => {
    setSeemore(true);
  };
  const handleSeeLess = () => {
    setSeemore(false);
  };

  return (
    <Card style={{marginBottom:'25px'}}>
      <PostHeader>
        <CardHeader
          avatar={
            <Avatar clt={posts?.name} src={posts?.imageUrl}>
              {posts?.name?.charAt(0)}
            </Avatar>
          }
          title={posts?.name}
          subheader={moment(posts?.createdAt).fromNow()}
        />
      </PostHeader>
      {posts.image.map((img, index) => (
        <SectionImg key={index}>
          <Image src={`${process.env.REACT_APP_API_IMAGE}${img}`} alt="" />
        </SectionImg>
      ))}
      <CardContent>
        <Typography variant="h6">{posts?.title}</Typography>
        <Typography variant="subtitle1" style={{ marginTop: "-10px" }}>
          {posts?.camera}
        </Typography>
        {posts?.note?.length > 150 ? (
          seemore ? (
            <Typography style={{ marginTop: "5px" }} variant="body2">
              {posts.note}&nbsp;
              <ButtonComment size="small" onClick={handleSeeLess}>
                See less
              </ButtonComment>
            </Typography>
          ) : (
            <Typography style={{ marginTop: "5px" }} variant="body2">
              {posts?.note?.substring(0, 150)}...&nbsp;
              <ButtonComment size="small" onClick={handleSeeMore}>
                See more
              </ButtonComment>
            </Typography>
          )
        ) : (
          posts?.note
        )}
      </CardContent>
      <Divider />
      <CardActionButton>
        <ButtonBottom
          size="large"
          variant="contained"
          color="success"
          onClick={handleApprove.bind(this, posts._id)}
        >
          <CheckCircleOutlinedIcon /> &nbsp; approved
        </ButtonBottom>
        <ButtonBottom
          size="large"
          variant="contained"
          color="error"
          onClick={handleDeletePost.bind(this, posts._id)}
        >
          <CancelOutlinedIcon /> &nbsp; not approved
        </ButtonBottom>
      </CardActionButton>
    </Card>
  );
};

export default AllPostsItem;
