const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    locationCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    locationAddress: {
      type: String,
      required: true,
      trim: true,
    },
    locationPincode: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Locations', locationSchema);
