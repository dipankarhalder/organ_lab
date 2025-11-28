const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

/**
 * Validates a MongoDB ObjectId.
 * If invalid, sends a BAD_REQUEST response with a custom or default message.
 * @param {string} id - The ID to validate
 * @param {object} res - Express response object
 * @param {string} [label='ID'] - Custom name for the ID in the message
 * @returns {boolean} - true if valid, false if response is sent
 */
const isValidObjectId = (id, res, label = 'ID') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: `Please enter a valid ${label.toLowerCase()}`,
    });
    return false;
  }
  return true;
};

module.exports = { isValidObjectId };
