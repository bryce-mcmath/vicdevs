const express = require('express');
const router = express.Router();

// Public GET api/profiles
router.get('/', (req, res) => res.send('profiles route'));

module.exports = router;
