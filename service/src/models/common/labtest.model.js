const mongoose = require('mongoose');

const labChargeSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const labtestSchema = new mongoose.Schema(
  {
    testCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    testName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    commission: {
      type: String,
    },
    reportDay: {
      type: String,
    },
    labCharge: {
      type: [labChargeSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sampletype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SampleType',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Labtest', labtestSchema);
