const express = require('express');
const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

const router = express.Router();
const secret = "SUPERSECRET56433543";

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

// Retrieve all user sessions
router.get('/', auth, async (req, res) => {
  const sessions = await Session.find({ userId: req.userId });
  res.send(sessions);
});

module.exports = router;
