import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LOCAL_NAME } from "../../../../constants/Global";
import { commentPost } from "../../searchSlice";
import { Comment } from "./Style";
const CommentForm = ({ posts }) => {
  const user = JSON.parse(localStorage.getItem(LOCAL_NAME));
  const [initialValues, setInitialValues] = useState("");
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (initialValues !== "") {
      try {
        await dispatch(
          commentPost({
            value: { username: user?.result?.name, comment: initialValues },
            id: posts._id,
          })
        );
        setInitialValues("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13){
      onSubmit()
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
