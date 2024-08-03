const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');

const router = express.Router();
const secret = "SUPERSECRET56433543";

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);

    //const user = new User({ email, password: hashedPassword });
    const user = await User.create({ username, password: hashedPassword });
console.log(user);
res.status(201).send({ message: 'User registered successfully' });
    //await user.save();

   // res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
});

// Log in an existing user and create a session
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    const session = new Session({ userId: user._id, ipAddress: req.ip });
    await session.save();

    res.send({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
});

module.exports = router;







// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Session = require('../models/Session');

// const router = express.Router();
// const secret ="SUPERSECRET56433543"

// // Register a new user
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = new User({ username, password: hashedPassword });
//   await user.save();

//   res.status(201).send({ message: 'User registered successfully' });
// });

// // Log in an existing user and create a session
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).send({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
//   const session = new Session({ userId: user._id, ipAddress: req.ip });
//   await session.save();

//   res.send({ token, message: 'Login successful' });
// });

// module.exports = router;
