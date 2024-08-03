const axios = require('axios');

const getWeather = async (location) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}`);
    return response.data;
};

module.exports = { getWeather };
