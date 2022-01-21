const express = require('express');

//? Controller
const feedController = require('../Controller/feed');

const router = express.Router();

router.get('/feeds', feedController.index);

module.exports = router;
