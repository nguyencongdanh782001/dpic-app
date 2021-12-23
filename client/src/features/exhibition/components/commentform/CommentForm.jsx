import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../../auth/authSlice";
import { commentExhPost } from "../../exhibitonPostSlice";
import { Comment } from "./Style";
const CommentForm = ({ exhposts }) => {
  const user = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const [initialValues, setInitialValues] = useState("");

  const onSubmit = async () => {
    try {
      await dispatch(
        commentExhPost({
          value: { username: user?.name, comment: initialValues },
          id: exhposts._id,
        })
      );
      setInitialValues("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };
  return (
    <form
      action=""
      onSubmit={onSubmit}
      onKeyDown={handleKeyPress}
      style={{ width: "95%" }}
    >
      <Comment
        name="comment"
        id="comment"
        value={initialValues}
        onChange={(e) => setInitialValues(e.target.value)}
        fullWidth
        variant="outlined"
        placeholder="Write comment..."
        type="text"
        multiline
        autoFocus
        size="small"
      />
    </form>
  );
};

export default CommentForm;
