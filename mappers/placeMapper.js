const mapPlaceAutocomplete = (prediction) => {
  return {
    place_id: prediction.place_id,
    description: prediction.description,
  };
};

const mapPlaceDetails = (result) => {
  return {
    place_id: result.place_id,
    name: result.name,
    address: result.formatted_address,
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng,
    // Add other fields as needed
  };
};

module.exports = {
  mapPlaceAutocomplete,
  mapPlaceDetails,
};