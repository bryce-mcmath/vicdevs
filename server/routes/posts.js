const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

// Private GET api/posts
// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    // sort posts by most recent
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Private GET api/posts/top
// Get all posts sorted by most liked
router.get('/top', auth, async (req, res) => {
  try {
    // sort posts by most liked
    const posts = await Post.find().sort({ likes: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send(error.message);
  }
});

// Private GET api/posts/:id
// Get post by id
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      // Status Code 404: Not Found
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      // Status Code 404: Not Found
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Private POST api/posts
// Create a new post
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Status Code 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);

      // Status Code 500: Internal Server Error
      res.status(500).send('Server error');
    }
  }
);

// Private DELETE api/posts/:id
// Delete post by id
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      // Status Code 404: Not Found
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user is owner of the post
    if (post.user.toString() !== req.user.id) {
      // Status Code 401: Unauthorized Error
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);

    // Check if invalid post id
    if (error.kind === 'ObjectId') {
      // Status Code 404: Not Found
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Private PUT api/posts/:id/like
// Like a post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      // Status Code 400: Bad Request
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Private PUT api/posts/:id/unlike
// Unlike a post
router.put('/:id/unlike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      // Status Code 400: Bad Request
      return res.status(400).json({ msg: "Post hasn't been liked" });
    }

    // Get remove index
    const removeInd = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeInd, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Private POST api/posts/:id/comment
// Create a new comment
router.post(
  '/:id/comment',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Status Code 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      // Add the comment
      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);

      // Status Code 500: Internal Server Error
      res.status(500).send('Server error');
    }
  }
);

// Private DELETE api/posts/:id/comment/:comment_id
// Delete a comment
router.delete('/:id/comment/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      // Status Code 404: Not Found
      return res.status(404).json({ msg: "Comment doesn't exist" });
    }

    // Check user is owner of comment
    if (comment.user.toString() !== req.user.id) {
      // Status Code 401: Unauthorized Error
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeInd = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    // Remove the comment
    post.comments.splice(removeInd, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Private PUT api/posts/:id/comment/:comment_id/like
// Like a comment
router.put('/:id/comment/:comment_id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Check if comment exists
    if (!comment) {
      // Status Code 404: Not Found
      return res.status(404).json({ msg: "Comment doesn't exist" });
    }

    // Check if the post has already been liked
    if (
      comment.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      // Status Code 400: Bad Request
      return res.status(400).json({ msg: 'Comment already liked' });
    }

    // Add the like
    comment.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Private PUT api/posts/:id/comment/:comment_id/unlike
// Unlike a comment
router.put(
  '/:id/comment/:comment_id/unlike',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Pull out comment
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );

      // Check if comment exists
      if (!comment) {
        // Status Code 404: Not Found
        return res.status(404).json({ msg: "Comment doesn't exist" });
      }

      // Check if the comment has already been liked
      if (
        comment.likes.filter(
          like => like.user.toString() === req.user.id
        ).length === 0
      ) {
        // Status Code 400: Bad Request
        return res
          .status(400)
          .json({ msg: "Comment hasn't been liked" });
      }

      // Get remove index
      const removeInd = comment.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);

      // Remove the like
      comment.likes.splice(removeInd, 1);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);

      // Status Code 500: Internal Server Error
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
