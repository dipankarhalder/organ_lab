const User = require('../models/admin/user.model');
const { StatusCodes } = require('http-status-codes');

const checkLocationAccess = async (req, res, next) => {
  const { locationId } = req.params;
  const decoded = req.user;

  try {
    const user = await User.findById(decoded.id).select('labLocation');

    if (!user || user.labLocation?.toString() !== locationId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message: 'You are not authorized to view the profile for this location.',
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while checking location access.',
      error: error.message,
    });
  }
};

module.exports = checkLocationAccess;
