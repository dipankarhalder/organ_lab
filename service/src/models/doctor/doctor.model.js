const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 },
    qualifications: { type: [String], default: [] },
    bio: { type: String },
    isActive: { type: Boolean, default: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Locations', required: true },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialization',
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Doctor', doctorSchema);
