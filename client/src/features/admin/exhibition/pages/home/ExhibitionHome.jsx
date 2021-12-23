import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseExhibition,
  ExhibitionNull,
} from "../../../../../constants/Image";
import { getuser } from "../../../../auth/authSlice";
import {
  getExhPosts,
  likeExhPost,
  updateExhPost,
} from "../../../../exhibition/exhibitonPostSlice";
import AllPostsItem from "../../../../exhibition/pages/home/allpostsitem/AllPostsItem";
import ExhibitionForm from "../../components/exhibitionform/ExhibitionForm";
import {
  createExhibition,
  deleteExhibition,
  getExhibition,
  updateExhibition,
} from "../../exhibitionSlice";
import Moment from "react-moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Menu, MenuItem, MenuList } from "./Style";
const ExhibitionHome = () => {
  const exhibition = useSelector((state) => state.exhibitionReducer.Exhibition);
  const loading = useSelector((state) => state.exhibitionReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  const posts = useSelector((state) => state.exhibitionPostReducer.ExhPosts);
  const loadingPosts = useSelector(
    (state) => state.exhibitionPostReducer.isLoading
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExhibition());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getExhPosts());
  }, [dispatch]);

  const exhposts = posts.filter((posts) => posts.approve === true);

  const handleLikePost = async (id) => {
    try {
      await dispatch(likeExhPost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
  });
  const [daystart, setDaystart] = useState(new Date());

  const [dayend, setDayend] = useState(new Date());

  const [currentId, setCurrentId] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleCurrentId = (id) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  const editValue = currentId
    ? exhibition.find((category) => category._id === currentId)
    : null;

  useEffect(() => {
    if (editValue) {
      setInitialValues(editValue);
    }
  }, [editValue]);

  const handleClickModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentId("");
    setInitialValues({ title: "" });
    setDaystart(new Date());
    setDayend(new Date());
    setOpenMenu(false)
  };
  const onSubmit = async (value) => {
    try {
      if (currentId) {
        const data = await dispatch(
          updateExhibition({value:{...value, daystart: daystart, dayend: dayend},id: currentId })
        );
        if (data?.payload) {
          setInitialValues({
            title: "",
          });
          setOpenMenu(false)
          setDaystart(new Date());
          setDayend(new Date());
          setCurrentId("");
          handleCloseModal();
        }
      } else {
        const data = await dispatch(
          createExhibition({ ...value, daystart: daystart, dayend: dayend })
        );
        if (data?.payload) {
          setInitialValues({
            message: "",
          });
          setDaystart(new Date());
          setDayend(new Date());
          handleCloseModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteExhibition(id));
      await exhposts.map(id => dispatch(updateExhPost({value:{approve: false},id: id._id}))) ;
      setOpenMenu(false)
    } catch (error) {
      console.log(error);
    }
  };

  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => {
    setOpenMenu((prevOpenmenu) => !prevOpenmenu);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item xs={12}>
        <ExhibitionForm
          currentId={currentId}
          initialValues={initialValues}
          openModal={openModal}
          handleClickModal={handleClickModal}
          handleCloseModal={handleCloseModal}
          onSubmit={onSubmit}
          daystart={daystart}
          setDaystart={setDaystart}
          dayend={dayend}
          setDayend={setDayend}
          exhibition={exhibition}
        />
      </Grid>
      {loading ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress style={{ margin: "auto" }} />
        </Grid>
      ) : exhibition?.length > 0 ? (
        <>
          <Grid item xs={12}>
            {exhibition.map((exh, index) => (
              <div key={index} style={{display:'flex', position:'relative'}}>
                <div>
                  <Typography variant="h6">{exh.title}</Typography>
                  <Typography variant="caption">
                    <Moment format="DD/MM/YYYY">{exh.daystart}</Moment>
                  </Typography>
                  &nbsp;-&nbsp;
                  <Typography variant="caption">
                    <Moment format="DD/MM/YYYY">{exh.dayend}</Moment>
                  </Typography>
                </div>
                <div style={{position:'relative'}}>
                  <Menu onClick={handleClick} size="small">
                    <MoreVertIcon />
                  </Menu>
                  {openMenu && (
                    <MenuList style={{ display: "flex" }}>
                      <MenuItem onClick={handleCurrentId.bind(this, exh._id)}>
                        <ModeEditOutlinedIcon fontSize="small" />
                      </MenuItem>
                      <MenuItem onClick={handleDelete.bind(this, exh._id)}>
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </MenuItem>
                    </MenuList>
                  )}
                </div>
              </div>
            ))}
          </Grid>
          {loadingPosts ? (
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress style={{ margin: "auto" }} />
            </Grid>
          ) : (
            <>
              {exhposts?.length > 0 ? (
                exhposts.map((exhposts, index) => (
                  <Grid item xs={11} sm={8} lg={7} key={index}>
                    <AllPostsItem
                      exhposts={exhposts}
                      user={user}
                      handleLikePost={handleLikePost}
                    />
                  </Grid>
                ))
              ) : (
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img src={ExhibitionNull} alt="" />
                    </div>
                    <Typography
                      style={{
                        marginTop: "20px",
                        fontSize: "23px",
                        color: "#757575",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      The exhibition has no posts
                    </Typography>
                  </div>
                </Grid>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={CloseExhibition} alt="" />
              </div>
              <Typography
                style={{
                  marginTop: "20px",
                  fontSize: "23px",
                  color: "#757575",
                  textAlign: "center",
                }}
              >
                Open exhibition,{" "}
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleClickModal}
                >
                  Open exhibition
                </Button>
              </Typography>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ExhibitionHome;
