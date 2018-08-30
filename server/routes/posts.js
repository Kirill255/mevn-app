var express = require('express');
var router = express.Router();

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const Post = require('../models/Post');

// /posts
router.route("/")
  .get((req, res, next) => {
    Post.find({}, function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    }).sort({ _id: -1 });
  })
  .post([
    body("title", "Title is required").not().isEmpty({ ignore_whitespace: true }), // not empty and ignore whitespace, "" or " "
    body("description", "Description is required").not().isEmpty({ ignore_whitespace: true }),
    sanitizeBody('*').trim().escape(),
  ], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const post = new Post({
        title: req.body.title,
        description: req.body.description
      })

      post.save((err, post) => {
        // if (err) return next(err);
        if (err) {
          // console.log('err :', err);
          return res.status(500).json({ errors: [err] }); // put err object in array [err], since our client-side expects an array
        }
        res.json({
          success: true,
          message: `Post with ID_${post._id} saved successfully!`
        })
      })
    }
  })
  .put((req, res, next) => {
    next(new Error('PUT Not implemented'));
  })
  .delete((req, res, next) => {
    next(new Error('DELETE Not implemented'));
  });

// /posts/:id
router.route("/:id")
  .get((req, res, next) => {
    let id = req.params.id;
    Post.findById(id, (err, post) => {
      if (err) return next(err);
      res.json(post);
    })
  })
  .post((req, res, next) => {
    next(new Error('POST Not implemented'));
  })
  .put([
    body("title", "Title is required").not().isEmpty({ ignore_whitespace: true }), // not empty and ignore whitespace, "" or " "
    body("description", "Description is required").not().isEmpty({ ignore_whitespace: true }),
    sanitizeBody('*').trim().escape(),
  ], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      let id = req.params.id;
      Post.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, post) => {
        // if (err) return next(err);
        if (err) {
          // console.log('err :', err);
          return res.status(500).json({ errors: [err] }); // put err object in array [err], since our client-side expects an array
        }
        res.json({
          success: true,
          message: `Post with ID_${post._id} updated successfully!`
        })
      })
    }
  })
  .delete((req, res, next) => {
    let id = req.params.id;
    Post.findByIdAndRemove(id, (err, post) => {
      if (err) return next(err);
      res.json({
        success: true,
        message: `Post with ID_${post._id} removed successfully!`
      })
    })
  });

module.exports = router;
