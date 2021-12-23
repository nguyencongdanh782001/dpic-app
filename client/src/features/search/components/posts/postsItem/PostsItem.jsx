import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  ButtonBottom,
  ButtonComment,
  CardActionButton,
  Image,
  Left,
  Right,
  SectionImg,
  ContentComment,
  CommentText,
} from "./Style";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CommentForm from "../../commentform/CommentForm";
import { yellow } from "@mui/material/colors";

const PostsItem = ({ posts, handleLikePost, user }) => {
  const [current, setCurrent] = useState(0);
  const [comment, setComment] = useState(false);
  const [seemore, setSeemore] = useState(false);
  const [download, setDownload] = useState(false);
  const length = posts?.image?.length;
  const nextStep = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevStep = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const Display = () => {
    if (length === 1 || length === 0) {
      return (
        <>
          {posts?.image?.map(
            (images, index) =>
              index === current && (
                <Image
                  key={index}
                  src={`${process.env.REACT_APP_API_IMAGE}${images}`}
                  alt=""
                />
              )
          )}
        </>
      );
    } else {
      return (
        <>
          <Left size="small" onClick={prevStep}>
            <ChevronLeftIcon />
          </Left>
          <Right size="small" onClick={nextStep}>
            <ChevronRightIcon />
          </Right>
          {posts.image.map(
            (images, index) =>
              index === current && (
                <Image
                  key={index}
                  src={`${process.env.REACT_APP_API_IMAGE}${images}`}
                  alt=""
                />
              )
          )}
        </>
      );
    }
  };
  const handleSeeMore = () => {
    setSeemore(true);
  };
  const handleSeeLess = () => {
    setSeemore(false);
  };
  const handleOpenComment = () => {
    setComment((prevComment) => !prevComment);
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: yellow[500] }}
            clt={posts.name}
            src={posts.imageUrl}
          >
            {posts?.name.charAt(0)}
          </Avatar>
        }
        title={posts?.name}
        subheader={moment(posts?.createdAt).fromNow()}
      />
      {length > 0 && (
        <SectionImg>
          <Display />
        </SectionImg>
      )}
      <CardContent>
        <Typography variant="h6" style={{ color: "#424242" }}>
          {posts.title}
        </Typography>
        <Typography variant="subtitle1" style={{ color: "#424242" }}>
          {posts.camera}
        </Typography>
        {posts?.note?.length > 150 ? (
          seemore ? (
            <Typography
              style={{ marginTop: "5px", color: "#424242" }}
              variant="body2"
            >
              {posts?.note}&nbsp;
              <ButtonComment size="small" onClick={handleSeeLess}>
                See less
              </ButtonComment>
            </Typography>
          ) : (
            <Typography
              style={{ marginTop: "5px", color: "#424242" }}
              variant="body2"
            >
              {posts?.note.substring(0, 150)}...&nbsp;
              <ButtonComment size="small" onClick={handleSeeMore}>
                See more
              </ButtonComment>
            </Typography>
          )
        ) : (
          <Typography style={{ marginTop: "5px", color: "#424242" }}>
            {posts?.note}
          </Typography>
        )}
      </CardContent>
      <Divider />
      <CardActionButton>
        <ButtonBottom
          disabled={!user}
          onClick={handleLikePost.bind(this, posts._id)}
          size="large"
          color="error"
        >
          {posts.like.find((like) => like === user?._id) ? (
            <>
              <FavoriteOutlinedIcon /> &nbsp; {posts?.like?.length}
              {posts.like.length >= 1000 ? "k" : ""}
            </>
          ) : (
            <>
              <FavoriteBorderOutlined /> &nbsp; {posts?.like?.length}
            </>
          )}
        </ButtonBottom>
        <ButtonBottom disabled={!user} size="large" onClick={handleOpenComment}>
          <TextsmsOutlinedIcon />
          &nbsp; {posts?.comment?.length}
        </ButtonBottom>
        <ButtonBottom
          disabled={!user}
          size="large"
          color={download ? "warning" : "info"}
          onClick={() => setDownload((prevDownload) => !prevDownload)}
        >
          {download ? (
            <SentimentVeryDissatisfiedIcon />
          ) : (
            <FileDownloadOutlinedIcon />
          )}
        </ButtonBottom>
      </CardActionButton>
      {comment && (
        <>
          <Divider />
          <div
            style={{ height: "auto", width: "100%", padding: "10px 0 10px 0" }}
          >
            <Grid container>
              <Grid item xs={12} style={{ marginBottom: "10px" }}>
                {posts?.comment?.map((cmt, index) => (
                  <ContentComment key={index}>
                    <Avatar
                      sx={{ bgcolor: yellow[500], width: 36, height: 35 }}
                      clt={cmt?.username}
                      src={cmt?.imageUrl}
                    >
                      {cmt?.username.charAt(0)}
                    </Avatar>
                    <CommentText>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#424242" }}
                      >
                        {cmt.username}
                      </Typography>
                      <Typography variant="body2" style={{ color: "#424242" }}>
                        {cmt.comment}
                      </Typography>
                    </CommentText>
                  </ContentComment>
                ))}
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  sx={{ bgcolor: yellow[500] }}
                  clt={posts?.name}
                  src={posts?.imageUrl}
                >
                  {posts?.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid
                item
                xs={10}
                style={{ display: "flex", alignItems: "center" }}
              >
                <CommentForm posts={posts} />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </Card>
  );
};

export default PostsItem;
