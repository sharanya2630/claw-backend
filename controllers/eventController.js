const Event = require('../models/Event');
const { getWeather } = require('../services/weatherService');

const createEvent = async (req, res) => {
    try {
        const event = new Event({ ...req.body, userId: req.user.id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user.id });
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getWeatherForEvent = async (req, res) => {
    try {
        const weather = await getWeather(req.params.location);
        res.status(200).json(weather);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent, getWeatherForEvent };
