const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Internal server error' });
  };
  
  module.exports = errorHandler;