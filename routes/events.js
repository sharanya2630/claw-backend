const express = require('express');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const axios = require('axios');

const router = express.Router();
const secret = "SUPERSECRET56433543";

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token)
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

// Create a new event
router.post('/', auth, async (req, res) => {
  const { name, date, location, description } = req.body;
  const userId=req.userId
  const event = new Event({ name, date, location, description ,userId});
  await event.save();
  res.status(201).send({ message: 'Event created successfully' });
});

// Retrieve all events for the logged-in user
router.get('/',auth,  async (req, res) => {
   
  const events = await Event.find({ userId: req.userId });

  console.log("events",events)
  res.send(events);
});

// Update an event by ID
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndUpdate(id, req.body);
  res.send({ message: 'Event updated successfully' });
});

// Delete an event by ID
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.send({ message: 'Event deleted successfully' });
});


router.get('/weather',async (req,res)=>{
  let city="hyderabad"
  console.log("jhgdhdjhdj")
  const apiKey = '60bdfe7a55b25e0cba4e82503346cc6a';
  // let city=req.params.city

   let response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  //  let data=await response.json()
   console.log(response.data)

   res.send("success");
  
})

// Fetch weather information for a given location
// router.get('/weather/:city', async (req, res) => {
// //   const { location } = req.params;
//   const searchResponse = await axios.get(`https://www.metaweather.com/api/location/search/`, {
//     params: { query: city }
//   });
//   console.log(searchResponse)
//   res.send(response.data);
// });

module.exports = router;
