const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const getPlaceAutocomplete = async (query) => {
  try {
    const response = await axios.get(`${PLACES_API_BASE_URL}/autocomplete/json?language=ja`, {
      params: {
        input: query,
        key: GOOGLE_MAPS_API_KEY,
        language: 'ja',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching place autocomplete:', error.message);
    throw new Error('Failed to fetch place autocomplete from Google Places API');
  }
};

const getPlaceDetails = async (place_id) => {
  try {
    const response = await axios.get(`${PLACES_API_BASE_URL}/details/json`, {
      params: {
        place_id,
        key: GOOGLE_MAPS_API_KEY,
        language: 'ja',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching place details:', error.message);
    throw new Error('Failed to fetch place details from Google Places API');
  }
};

module.exports = {
  getPlaceAutocomplete,
  getPlaceDetails,
};