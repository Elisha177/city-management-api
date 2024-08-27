const cities = []; 

// Function to add a city
const addCity = (city) => {
  cities.push(city);
  return city;
};

// Function to get all cities
const getCities = () => cities;

// Function to get a city by ID
const getCityById = (id) => cities.find((city) => city.id === id);

// Function to update a city by ID
const updateCity = (id, updatedCity) => {
  const index = cities.findIndex((city) => city.id === id);
  if (index !== -1) {
    cities[index] = updatedCity;
    return updatedCity;
  }
  return null;
};

// Function to delete a city by ID
const deleteCity = (id) => {
  const index = cities.findIndex((city) => city.id === id);
  if (index !== -1) {
    cities.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  addCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
};