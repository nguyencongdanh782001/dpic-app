// import {Typography } from "@mui/material";
import React, { useState } from "react";
import { ButtonComment, Container, HeaderLeft, HeaderNotify} from "./Style";
import { Avatar, Typography } from "@mui/material";
import moment from "moment";

const NotifyItem = ({ notify }) => {
  const [seemore, setSeemore] = useState(false);

  const handleSeeMore = () => {
    setSeemore(true);
  };
  const handleSeeLess = () => {
    setSeemore(false);
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
