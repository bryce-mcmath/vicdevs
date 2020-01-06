import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Create a new post!</h3>
      </div>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addPost({ title, text });
          setTitle("");
          setText("");
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Add a title for your post"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add text body (optional)"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
