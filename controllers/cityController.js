const City = require('../models/city');
const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

const addCity = async (req, res, next) => {
  try {
    const { name, population, country, latitude, longitude } = req.body;

    // Check if city already exists
    if (db.getCities().find((city) => city.name.toLowerCase() === name.toLowerCase())) {
      return res.status(409).json({ message: 'City with that name already exists' });
    }

    // Create a new city instance
    const newCity = new City(name, population, country, latitude, longitude);
    newCity.id = uuidv4(); // Assign a unique ID

    // Add city to the database
    const addedCity = db.addCity(newCity);

    res.status(201).json({
      message: 'City added successfully',
      city: addedCity,
    });
  } catch (error) {
    next(error);
  }
};

const updateCity = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedCity = req.body;

    // Find the city to update
    const existingCity = db.getCityById(id);
    if (!existingCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Update city details
    const updated = db.updateCity(id, updatedCity);
    if (updated) {
      res.status(200).json({
        message: 'City updated successfully',
        city: updatedCity,
      });
    } else {
      res.status(500).json({ message: 'Error updating city' });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCity = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Delete the city
    const deleted = db.deleteCity(id);
    if (deleted) {
      res.status(200).json({ message: 'City deleted successfully' });
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getCities = async (req, res, next) => {
  try {
    // Implementing pagination, filtering, sorting, searching, and projection here
    
    const getCities = async (req, res, next) => {
        try {
          const { page, limit, filter, sort, search, projection } = req.query;
          
          let cities = db.getCities();
          
          // Pagination
          const currentPage = parseInt(page) || 1;
          const pageSize = parseInt(limit) || 10;
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = currentPage * pageSize;
          
          // Filtering
          if (filter) {
            
            const filterQuery = JSON.parse(filter);
            cities = cities.filter(city => {
              // Check if any filter criteria matches
              return Object.entries(filterQuery).every(([key, value]) => {
                return city[key] === value; 
              });
            });
          }
          
          // Sorting
          if (sort) {
            
            cities.sort((a, b) => {
              if (sort.startsWith('-')) {
                const field = sort.slice(1);
                return b[field] - a[field]; // Descending order
              } else {
                return a[sort] - b[sort]; // Ascending order
              }
            });
          }
          
          // Searching
          if (search) {
            
            cities = cities.filter(city => {
              return city.name.toLowerCase().includes(search.toLowerCase());
            });
          }
          
          // Projection
          if (projection) {
            
            cities = cities.map(city => {
              const projectedCity = {};
              const fields = projection.split(',');
              fields.forEach(field => {
                projectedCity[field] = city[field];
              });
              return projectedCity;
            });
          }
          
          // Pagination
          const paginatedCities = cities.slice(startIndex, endIndex);
          
          res.status(200).json({
            cities: paginatedCities,
          });
        } catch (error) {
          next(error);
        }
      };


    

    // Get all cities from the database
    const cities = db.getCities();

    res.status(200).json({
      cities,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCity,
  updateCity,
  deleteCity,
  getCities,
};