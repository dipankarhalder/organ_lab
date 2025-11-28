const mongoose = require('mongoose');
const { role } = require('../../constant');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: [role.genderInfo.MALE, role.genderInfo.FEMALE, role.genderInfo.OTHER],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
  },
  emergencyContact: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      relation: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  createdBy: {
    type: String,
    enum: [role.createInfo.SELF, role.createInfo.ORNG],
    default: role.createInfo.SELF,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Patient', patientSchema);
