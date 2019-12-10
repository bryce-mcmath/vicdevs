const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const mongoose = require('mongoose');
// const { RateLimiterMongo } = require('rate-limiter-flexible');

// Public GET api/auth
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send('Server error');
  }
});

// Public POST api/auth
// Authenticate a user, get token
// @TODO: add brute force protection
// https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#minimal-protection-against-password-brute-force
// const maxConsecFails = 5;
// const mongoConn = mongoose.connection;
// const limiterConsecFails = new RateLimiterMongo({
//   storeClient: mongoConn,
//   keyPrefix: 'login_fail_consecutive_username',
//   points: maxConsecFails,
//   duration: 60 * 60 * 0.5, // Store number for half an hour since first fail
//   blockDuration: 60 * 15 // Block for fifteen minutes
// });

router.post(
  '/',
  [
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Status Code 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check if email is associated with an account
      if (!user) {
        return (
          res
            // Status Code 400: Bad Request
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }] })
        );
      }

      // Compare entered password with encrypted password in db
      const isMatch = await bcrypt.compare(password, user.password);

      // Return error if password is incorrect
      if (!isMatch) {
        return (
          res
            // Status Code 400: Bad Request
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }] })
        );
      }

      // Create payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Return jsonwebtoken
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);

      // Status Code 500: Internal Server Error
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
