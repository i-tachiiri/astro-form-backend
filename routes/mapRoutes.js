const express = require('express');
const router = express.Router();
const { getPlaceAutocomplete, getPlaceDetails } = require('../services/placeService');
const { mapPlaceAutocomplete, mapPlaceDetails } = require('../mappers/placeMapper');

router.get('/', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    const data = await getPlaceAutocomplete(query);
    const predictions = data.predictions.map(mapPlaceAutocomplete);
    res.json({ predictions });
  } catch (error) {
    console.error('Error in /map route:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:place_id', async (req, res) => {
  const { place_id } = req.params;

  try {
    const data = await getPlaceDetails(place_id);
    const placeDetails = mapPlaceDetails(data.result);
    res.json(placeDetails);
  } catch (error) {
    console.error('Error in /map/:place_id route:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;