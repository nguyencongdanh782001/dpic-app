import React from "react";
import { Comment } from "./Styles";

const CommentMik = ({
  field,
  label,
  type,
  multiline,
  rows,
  autoFocus,
  values,
  placeholder,
}) => {
  const { name, onChange, onBlur } = field;
  return (
    <Comment
      name={name}
      id={name}
      value={values}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      type={type}
      label={label}
      multiline={multiline ? true : false}
      rows={rows}
      autoFocus={autoFocus}
      size="small"
    />
  );
};

export default CommentMik;
