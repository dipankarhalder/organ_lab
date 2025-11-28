const { StatusCodes } = require('http-status-codes');
const Patient = require('../models/patient/patient.model');
const { core, mongoValid } = require('../utils');
const { role } = require('../constant');

const createPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact = [],
      createdBy,
    } = req.body;

    const existingPatient = await Patient.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingPatient) {
      if (existingPatient.email === email) {
        return core.validateFields(res, 'Patient with this email already exists');
      }
      if (existingPatient.phone === phone) {
        return core.validateFields(res, 'Patient with this phone number already exists');
      }
    }

    const createdInfo =
      createdBy === role.createInfo.ORNG ? role.createInfo.ORNG : role.createInfo.SELF;

    const patientData = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      createdBy: createdInfo,
    };

    const newPatient = new Patient(patientData);
    await newPatient.save();

    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newPatient,
      message: 'Patient profile created successfully',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const listPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const patients = await Patient.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    const total = await Patient.countDocuments(filter);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: patients,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const getPatientDetails = async (req, res) => {
  try {
    const patientId = req.params.id;
    if (!mongoValid.isValidObjectId(patientId, res, 'patient ID')) return;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return core.notFoundItem(res, 'Patient not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: patient,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    if (!mongoValid.isValidObjectId(patientId, res, 'patient ID')) return;

    const existingPatient = await Patient.findById(patientId);
    if (!existingPatient) {
      return core.notFoundItem(res, 'Patient not found');
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
    } = req.body;

    if (email && email !== existingPatient.email) {
      const emailExists = await Patient.findOne({
        email,
        _id: { $ne: patientId },
      });
      if (emailExists) {
        return core.validateFields(res, 'Another patient is already using this email');
      }
    }

    if (phone && phone !== existingPatient.phone) {
      const phoneExists = await Patient.findOne({
        phone,
        _id: { $ne: patientId },
      });
      if (phoneExists) {
        return core.validateFields(
          res,
          'Another patient is already using this phone number',
        );
      }
    }

    if (firstName) existingPatient.firstName = firstName;
    if (lastName) existingPatient.lastName = lastName;
    if (email) existingPatient.email = email;
    if (phone) existingPatient.phone = phone;
    if (gender) existingPatient.gender = gender;
    if (dateOfBirth) existingPatient.dateOfBirth = dateOfBirth;
    if (address) existingPatient.address = address;
    if (Array.isArray(emergencyContact)) {
      existingPatient.emergencyContact = emergencyContact;
    }

    await existingPatient.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Patient information updated successfully',
      data: existingPatient,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    if (!mongoValid.isValidObjectId(patientId, res, 'patient ID')) return;

    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if (!deletedPatient) {
      return core.notFoundItem(res, 'Patient not found');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Patient deleted successfully',
      data: deletedPatient,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createPatient,
  listPatients,
  getPatientDetails,
  updatePatient,
  deletePatient,
};
