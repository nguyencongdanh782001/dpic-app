import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import {
  ButtonBottom,
  ButtonComment,
  CardActionButton,
  CommentText,
  ContentComment,
  Image,
  MoreButton,
  MoreMenu,
  MoreMenuContent,
  MoreMenuItem,
  PostHeader,
  SectionImg,
} from "./Style";
import React, { useState } from "react";
import moment from "moment";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CommentForm from "../../../components/commentform/CommentForm";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { yellow } from "@mui/material/colors";
const AllPostsItem = ({ exhposts, handleLikePost, user, handleDeletePost }) => {
  const [comment, setComment] = useState(false);
  const [seemore, setSeemore] = useState(false);
  const [download, setDownload] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
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
      <PostHeader>
        <CardHeader
          avatar={
            <Avatar clt={exhposts?.name} src={exhposts?.imageUrl}>
              {exhposts?.name?.charAt(0)}
            </Avatar>
          }
          title={exhposts?.name}
          subheader={moment(exhposts?.createdAt).fromNow()}
        />
        <ClickAwayListener onClickAway={handleClickAway}>
          <MoreMenu>
            <MoreButton onClick={handleClick}>
              <MoreHorizIcon />
            </MoreButton>
            {open ? (
              <MoreMenuItem>
                <MoreMenuContent
                  onClick={handleDeletePost.bind(this, exhposts._id)}
                >
                  <DeleteOutlinedIcon fontSize="small" />
                  &ensp;Delete
                </MoreMenuContent>
              </MoreMenuItem>
            ) : null}
          </MoreMenu>
        </ClickAwayListener>
      </PostHeader>
      {exhposts.image.map((img, index) => (
        <SectionImg key={index}>
          <Image src={`${process.env.REACT_APP_API_IMAGE}${img}`} alt="" />
        </SectionImg>
      ))}
      <CardContent>
        <Typography variant="h6">{exhposts?.title}</Typography>
        <Typography variant="subtitle1">{exhposts?.camera}</Typography>
        {exhposts?.note?.length > 150 ? (
          seemore ? (
            <Typography style={{ marginTop: "5px" }} variant="body2">
              {exhposts.note}&nbsp;
              <ButtonComment size="small" onClick={handleSeeLess}>
                See less
              </ButtonComment>
            </Typography>
          ) : (
            <Typography style={{ marginTop: "5px" }} variant="body2">
              {exhposts?.note?.substring(0, 150)}...&nbsp;
              <ButtonComment size="small" onClick={handleSeeMore}>
                See more
              </ButtonComment>
            </Typography>
          )
        ) : (
          exhposts?.note
        )}
      </CardContent>
      <Divider />
      <CardActionButton>
        {exhposts.approve ? (
          <>
            <ButtonBottom
              disabled={!user.role}
              onClick={handleLikePost.bind(this, exhposts?._id)}
              size="large"
              color="error"
            >
              {exhposts?.like?.find((like) => like === user?._id) ? (
                <>
                  <FavoriteOutlinedIcon /> &nbsp; {exhposts?.like?.length}
                  {exhposts.like.length >= 1000 ? "k" : ""}
                </>
              ) : (
                <>
                  <FavoriteBorderOutlined /> &nbsp; {exhposts?.like?.length}
                </>
              )}
            </ButtonBottom>
            <ButtonBottom
              disabled={!user?.role}
              size="large"
              onClick={handleOpenComment}
            >
              <TextsmsOutlinedIcon /> &nbsp; {exhposts?.comment?.length}
            </ButtonBottom>
            <ButtonBottom
              disabled={!user?.role}
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
          </>
        ) : (
          <div style={{ width: "100%" }}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", color: "#757575" }}
            >
              Waiting for approval
            </Typography>
          </div>
        )}
      </CardActionButton>
      {comment && (
        <>
          <Divider />
          <div
            style={{ height: "auto", width: "100%", padding: "10px 0 10px 0" }}
          >
            <Grid container>
              <Grid item xs={12} style={{ marginBottom: "10px" }}>
                {exhposts?.comment?.map((cmt, index) => (
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
                  clt={exhposts?.name}
                  src={exhposts?.imageUrl}
                >
                  {exhposts?.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid
                item
                xs={10}
                style={{ display: "flex", alignItems: "center" }}
              >
                <CommentForm exhposts={exhposts} />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </Card>
  );
};

export default AllPostsItem;
